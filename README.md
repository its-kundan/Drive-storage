# Drive Storage.

A powerful Google Drive clone that allows users to upload, manage, and share files seamlessly. Built with **Next.js** for a dynamic and high-performance file management system.

## 🚀 Features

- **File Upload & Management**: Upload, organize, and manage files efficiently.
- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Folder Navigation**: Create, navigate, and manage folders with ease.
- **File Sharing**: Generate shareable links for hassle-free file sharing.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Real-Time Updates**: Instant synchronization of changes without reloading.

## 🛠️ Technologies Used

- **Frontend & Backend**: Next.js
- **Styling**: Tailwind CSS
- **Database**: Appwrite Database
- **Authentication**: Appwrite Auth
- **File Storage**: Appwrite Storage

## 📦 Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/its-kundan/Drive-storage.git
   cd Drive-storage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env.local` file in the root directory and include the following variables:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
   NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
   NEXT_APPWRITE_KEY=your_secret_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## 📂 Folder Structure

```
Drive-storage/
├── components/     # Reusable React components
├── pages/          # Next.js pages and API routes
├── styles/         # Global and module CSS files
├── utils/          # Helper functions and utilities
├── public/         # Static assets
├── .env.local      # Environment variables
└── README.md       # Project documentation
```

## 🖼️ Screenshots

### Home Page
*Include a screenshot of your homepage or dashboard*

### File Upload
*Include a screenshot of the file upload feature*

## 🛡️ Security

- Secure authentication with Appwrite Auth.
- Authenticated API routes to ensure data protection.
- File uploads handled securely with Appwrite Storage.

## 🤝 Contributions

Contributions are always welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📈 Deployment

This project is ready to deploy on platforms like **Vercel**, **Netlify**, or any cloud provider. Update your environment variables on the respective platform during deployment.

## 📝 Contact

Feel free to reach out for any questions or collaboration opportunities:

- **Name**: Kundan Kumar  
- **GitHub**: [its-kundan](https://github.com/its-kundan)  
- **LinkedIn**: [Kundan Kumar](https://www.linkedin.com/in/its-kundan/)  
- **Twitter (X)**: [@kundan_k_](https://x.com/kundan_k_)

---

Made with ❤️ by Kundan Kumar
