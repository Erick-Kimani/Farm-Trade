<template>
  <v-app>
    <!-- ✅ Top App Bar -->
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
    </v-app-bar>

    <!-- ✅ Sidebar Drawer with Hover Effect -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      app
      @mouseenter="rail = false"
      @mouseleave="rail = true"
    >
      <v-list>
        <v-list-item>
          <div
            class="mx-auto my-4"
            style="width: 90px; height: 90px; border-radius: 50%; overflow: hidden;"
          >
            <img
              src="/images/medium-shot-anime-style-man-portrait.jpg"
              alt="Admin Avatar"
              style="width: 100%; height: 100%; object-fit: contain;"
            />
          </div>
          <v-list-item-title class="text-center font-weight-bold">
            Admin Panel
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- ✅ Navigation Menu -->
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" />
        <v-list-item prepend-icon="mdi-account" title="My Account" value="account" />
        <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" />
        <v-list-item
          prepend-icon="mdi-message-text-outline"
          title="Messages"
          value="messages"
          @click="toggleMessages"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- ✅ Main Admin Page -->
    <v-main class="pa-6">
      <v-container
        fluid
        class="pa-6"
        style="background: linear-gradient(135deg, #f0f4ff, #e0ecff); border-radius: 16px;"
      >
        <v-sheet border rounded elevation="4" class="pa-4">
          <v-data-table :headers="headers" :items="users">
            <template #top>
              <v-toolbar flat>
                <v-toolbar-title>User Management</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-plus" rounded="lg" text="Add User" @click="showAddDialog = true"></v-btn>
              </v-toolbar>
            </template>

            <!-- ✅ Role Chip -->
            <template #item.role="{ value }">
              <v-chip :color="value === 'Farmer' ? 'green-lighten-2' : 'blue-lighten-3'" label>
                {{ value }}
              </v-chip>
            </template>

            <!-- ✅ Status Button -->
            <template #item.status="{ item }">
              <v-btn :color="item.active ? 'green' : 'red'" @click="toggleStatus(item)">
                {{ item.active ? 'Deactivate' : 'Activate' }}
              </v-btn>
            </template>

            <!-- ✅ Actions Column -->
            <template #item.actions="{ item }">
              <v-btn icon color="blue" variant="text" @click="editUser(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" variant="text" @click="removeUser(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-sheet>
      </v-container>

      <!-- 💬 Messages Dialog -->
      <v-dialog v-model="showMessages" max-width="550">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>📨 User Messages</span>
            <v-icon color="red" @click="showMessages = false">mdi-close</v-icon>
          </v-card-title>

          <v-divider></v-divider>

          <!-- 🧾 Messages Display -->
          <v-card-text style="max-height: 350px; overflow-y: auto;">
            <div v-if="userMessages.length">
              <div
                v-for="(msg, index) in userMessages"
                :key="index"
                class="mb-3 pa-2 rounded-lg d-flex justify-space-between align-start"
                :style="{ backgroundColor: msg.from === 'user' ? '#e0f7fa' : '#f1f8e9' }"
              >
                <div style="flex-grow: 1; padding-right: 8px;">
                  <p class="mb-1">
                    <strong>{{ msg.from === 'user' ? msg.senderName : 'Admin' }}:</strong>
                    {{ msg.text }}
                  </p>
                  <small class="text-grey">🕒 {{ msg.timestamp }}</small>
                </div>

                <v-btn icon color="red-darken-1" size="small" variant="text" @click="deleteMessage(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
            <div v-else class="text-center text-grey">No messages yet.</div>
          </v-card-text>

          <v-divider></v-divider>

          <!-- ✍️ Reply Section -->
          <v-card-actions class="d-flex align-center pa-3">
            <v-text-field
              v-model="replyText"
              placeholder="Write a reply..."
              variant="outlined"
              density="comfortable"
              hide-details
              class="flex-grow-1"
            ></v-text-field>
            <v-btn color="primary" variant="elevated" @click="sendReply" :disabled="!replyText.trim()">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 🆕 Add/Edit User Dialog -->
      <v-dialog v-model="showAddDialog" max-width="500">
        <v-card>
          <v-card-title>
            {{ editingUser ? 'Edit User' : 'Add New User' }}
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="newUser.name" label="Full Name"></v-text-field>
            <v-text-field v-model="newUser.phone" label="Phone Number"></v-text-field>
            <v-text-field v-model="newUser.email" label="Email"></v-text-field>
            <v-select
              v-model="newUser.role"
              :items="['Farmer', 'Customer']"
              label="Role"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeAddDialog">Cancel</v-btn>
            <v-btn color="green" text @click="saveUser">
              {{ editingUser ? 'Save Changes' : 'Add User' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";

const drawer = ref(true);
const rail = ref(true);
const showMessages = ref(false);
const showAddDialog = ref(false);
const editingUser = ref(false);
const replyText = ref("");
const userMessages = ref([]);

const users = ref([
  { id: 1, name: "John Mwangi", phone: "0712345678", email: "john@example.com", role: "Farmer", active: true },
  { id: 2, name: "Mary Wanjiku", phone: "0798765432", email: "mary@example.com", role: "Customer", active: false },
]);

const newUser = ref({
  id: null,
  name: "",
  phone: "",
  email: "",
  role: "",
  active: true,
});

const headers = [
  { title: "Name", key: "name" },
  { title: "Phone Number", key: "phone" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions" },
];

// ✅ Load messages
function loadMessages() {
  userMessages.value = JSON.parse(localStorage.getItem("userMessages")) || [];
}

function toggleMessages() {
  showMessages.value = !showMessages.value;
  if (showMessages.value) loadMessages();
}

function deleteMessage(index) {
  if (confirm("Are you sure you want to delete this message?")) {
    userMessages.value.splice(index, 1);
    localStorage.setItem("userMessages", JSON.stringify(userMessages.value));
  }
}

function sendReply() {
  if (!replyText.value.trim()) return;

  const replyMsg = {
    text: replyText.value,
    timestamp: new Date().toLocaleTimeString(),
    from: "admin",
  };
  userMessages.value.push(replyMsg);
  localStorage.setItem("userMessages", JSON.stringify(userMessages.value));
  replyText.value = "";
}

// ✅ Toggle Active Status
function toggleStatus(user) {
  user.active = !user.active;
}

// ✅ Add User / Edit User
function saveUser() {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.role) {
    alert("Please fill in all fields.");
    return;
  }

  if (editingUser.value) {
    const index = users.value.findIndex((u) => u.id === newUser.value.id);
    if (index !== -1) users.value[index] = { ...newUser.value };
  } else {
    newUser.value.id = Date.now();
    users.value.push({ ...newUser.value });
  }

  closeAddDialog();
}

function closeAddDialog() {
  showAddDialog.value = false;
  editingUser.value = false;
  newUser.value = { id: null, name: "", phone: "", email: "", role: "", active: true };
}

function editUser(user) {
  editingUser.value = true;
  newUser.value = { ...user };
  showAddDialog.value = true;
}

function removeUser(user) {
  if (confirm(`Are you sure you want to remove ${user.name}?`)) {
    users.value = users.value.filter((u) => u.id !== user.id);
  }
}

onMounted(() => loadMessages());
</script>

<style scoped>
.v-data-table {
  background-color: white;
  border-radius: 12px;
}

.v-dialog {
  border-radius: 16px;
}

/* ✨ Smooth hover drawer transition */
.v-navigation-drawer {
  transition: width 0.3s ease;
}
</style>
