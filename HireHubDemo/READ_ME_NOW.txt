
# � HIREHUB FINAL COMPLETE PACKAGE

You have 3 important files. Please follow this order EXACTLY.

## 1️⃣ DATABASE (Crucial First Step)
1.  Open **MySQL Workbench**.
2.  Open `HireHub-Database.sql`.
3.  **Run the script** (Lightning Bolt Icon).
    *   ✅ This creates the table.
    *   ✅ This forces the `admin@hirehub.com` user into the database.

## 2️⃣ BACKEND (Spring Boot)
1.  **Delete** your old `hirehub-core` folder.
2.  **Unzip** `HireHub-Spring-Backend.zip`.
3.  **Import** into Eclipse/IntelliJ.
4.  **Run** `HireHubCoreApplication.java`.
    *   Wait for "Started HireHubCoreApplication".

## 3️⃣ FRONTEND (React)
1.  **Delete** your old `hirehub-web` folder.
2.  **Unzip** `HireHub-React-Frontend.zip`.
3.  Open VS Code in this new folder.
4.  Run `npm install` (Must do this again!).
5.  Run `npm run dev`.

---

## 🔑 LOGIN CREDENTIALS
Go to browser -> Login Page -> Click **ADMIN** Tab.

*   **Email**: `admin@hirehub.com`
*   **Password**: `admin123`

(If `Access denied` error in backend console: Update `application.properties` with *your* MySQL password).
