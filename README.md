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
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3 (or any other cloud storage solution)

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
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=your_bucket_name
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

- Password hashing with bcrypt.
- Authenticated API routes to ensure data protection.
- File uploads handled securely with AWS S3.

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
