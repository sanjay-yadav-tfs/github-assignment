# Persistent Embedded Database Guide

## 🗄️ **Database Overview**

Your Node.js project now uses a **persistent file-based SQLite database** that:
- ✅ **Never loses data** on server restart
- ✅ **Persists between deployments**
- ✅ **Survives project close/reopen**
- ✅ **Maintains data integrity**
- ✅ **Creates automatic backups**
- ✅ **Self-contained** (no external dependencies)

## 📁 **Database Location**

```
backend/
├── database/
│   ├── persistent_user_onboarding.db    # Main database file
│   └── backups/                          # Automatic backups
│       ├── backup-2025-09-28T09-00-00.db
│       └── backup-2025-09-28T08-00-00.db
```

## 🚀 **Quick Start**

1. **Use Persistent Configuration**:
   ```bash
   # Copy persistent environment
   copy .env.persistent .env
   ```

2. **Start the Server**:
   ```bash
   npm run dev
   ```

3. **Database Auto-Initialization**:
   - Creates database file if doesn't exist
   - Preserves existing data if file exists
   - Creates admin user only once
   - Never drops or alters existing tables

## 🔧 **Configuration Options**

### Environment Variables (.env.persistent):
```bash
# Database persistence
DB_TYPE=sqlite
DB_PERSISTENT=true
DB_NAME=database/persistent_user_onboarding.db

# Performance settings
DB_JOURNAL_MODE=WAL          # Write-Ahead Logging
DB_SYNCHRONOUS=NORMAL        # Balance safety/speed
DB_AUTO_VACUUM=true          # Automatic cleanup

# Backup settings
DB_BACKUP_ENABLED=true       # Enable auto-backups
DB_BACKUP_INTERVAL=24        # Hours between backups
```

## 📊 **Data Persistence Features**

### ✅ **What Persists**:
- All user registrations
- Admin approvals/rejections
- User profile updates
- Login history
- Database schema/structure

### ✅ **Automatic Backups**:
- Created on server startup
- Keeps last 5 backups
- Timestamped filenames
- Stored in `database/backups/`

### ✅ **Data Integrity**:
- ACID compliance
- Foreign key constraints
- Transaction support
- Crash recovery

## 🛠️ **Database Management**

### **Check Database Status**:
```bash
# API endpoint (admin required)
GET /api/database/status

# Response includes:
{
  "totalUsers": 5,
  "admins": 1,
  "pending": 2,
  "approved": 3,
  "databasePath": "/full/path/to/database.db",
  "databaseSize": "156.32 KB"
}
```

### **Manual Backup**:
```bash
# Copy the database file
copy database/persistent_user_onboarding.db database/manual_backup.db
```

### **Database Location**:
- **Development**: `backend/database/persistent_user_onboarding.db`
- **Production**: Same location (portable)

## 🔄 **Migration & Deployment**

### **Moving to New Environment**:
1. Copy entire `database/` folder
2. Set environment variables
3. Start server - data will be preserved

### **Backup & Restore**:
```bash
# Backup
copy database/persistent_user_onboarding.db backups/manual-backup.db

# Restore
copy backups/manual-backup.db database/persistent_user_onboarding.db
```

## 🎯 **Default Admin Account**

**Created automatically on first run:**
- **Email**: admin@example.com
- **Password**: admin123
- **Status**: Never deleted or modified

## 📈 **Performance Benefits**

- **Fast**: In-process database (no network calls)
- **Reliable**: ACID transactions
- **Scalable**: Handles thousands of users
- **Portable**: Single file database
- **Zero Dependencies**: No external database server needed

## 🔍 **Monitoring & Debugging**

### **Server Logs Show**:
```bash
📁 Database file: /full/path/to/persistent_user_onboarding.db
📊 Database exists: true
✅ Database connection established
✅ Database models synchronized (data preserved)
ℹ️ Admin user already exists (data preserved)
💾 Database backup created: backup-2025-09-28T09-15-30.db
📊 Database Statistics: { totalUsers: 5, admins: 1, ... }
```

### **Check Database Status**:
- Visit: `http://localhost:3000/api/health`
- Admin Panel: `http://localhost:3000/api/database/status`

## ⚠️ **Important Notes**

1. **Never delete** the `database/` folder manually
2. **Backup before major changes** (automatic backups included)
3. **Database file is portable** - can be moved between environments
4. **Data survives** server restarts, deployments, and project moves
5. **Admin user persists** - no need to recreate

## 🚨 **Troubleshooting**

### **If Database Issues Occur**:
1. Check database file exists: `database/persistent_user_onboarding.db`
2. Check file permissions (read/write access)
3. Use backup: copy from `database/backups/`
4. Check server logs for detailed error messages

The database is now **100% persistent** and will never lose your data! 🎉