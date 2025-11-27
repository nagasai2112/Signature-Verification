# Signature Verification System – MERN + Deep Learning

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express.js-yellow)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![PyTorch](https://img.shields.io/badge/DeepLearning-PyTorch-red)
![License](https://img.shields.io/badge/License-MIT-green)

A secure, automated signature verification system built using the MERN stack and deep learning. It verifies handwritten signatures with high accuracy using a CNN-based model and helps prevent fraud in real-time. Designed for banks, legal documentation, and identity verification .

---

## 🚀 Overview

- Upload signature images from the frontend  
- Backend validates the user and processes data  
- Deep learning model (CNN) verifies the signature  
- MongoDB stores logs, users, and signature data  
- Real-time result: *Genuine* or *Forged*  
- Prevents fraud & reduces manual verification  
- Built using React, Node.js, Express, MongoDB & PyTorch  
- Ideal for banking, legal, finance & high-security workflows

---

## 🧠 Problem Statement
To build a secure, automated system that verifies handwritten signatures using MERN for frontend–backend communication and deep learning for accurate signature classification. The goal is to reduce fraud and ensure secure document handling.

---

## 💡 Solution Summary
A complete Signature Verification Platform where the React frontend allows signature uploads, the Node.js/Express backend handles validation, and a PyTorch-based CNN model verifies signatures. MongoDB stores all signature data and verification logs. The system provides real-time decisions, reducing errors and preventing fraud. 
---

## 🛠 Tech Stack

### **Frontend**
- React.js (UI, upload system)

### **Backend**
- Node.js  
- Express.js (REST APIs)

### **Database**
- MongoDB (user data, signatures, logs)

### **Deep Learning**
- PyTorch  
- CNN for signature classification  

---

## 🔁 Workflow Summary

### 1️⃣ **Frontend**
- User uploads signature  
- Input validation  
- Sends data to backend  

### 2️⃣ **Backend**
- User authentication  
- Accepts signature  
- Forwards to deep learning module  

### 3️⃣ **Deep Learning (CNN Model)**
- Image preprocessing  
- Feature extraction (edges, curves, patterns)  
- Classification → Genuine / Forged  
- Sends result to backend  

---

## 🧬 CNN Processing Flow
1. Input signature image  
2. Resize + convert to tensor  
3. Convolution layers extract features  
4. Pooling reduces dimensions  
5. Flatten to 1D vector  
6. Fully Connected Layers  
7. Output:  
   - Score > 0.5 → **Genuine**  
   - Score ≤ 0.5 → **Forged**  

---

## 💼 Business Case
This system automates signature verification for industries that rely on high security and identity verification—such as banks, legal firms, insurance, and payment processors. It reduces fraud, saves time, cuts operational costs, and scales for high transaction volumes. Can be monetized via subscription or pay-per-use model.  
Target customers:  
- Banks & financial institutions  
- Legal firms  
- Insurance companies  
- Payment processors  
- Small/medium businesses  


---

A MERN + Deep Learning–based signature verification system that automatically authenticates handwritten signatures using a PyTorch CNN model. The platform includes a React frontend for uploads, a Node/Express backend for processing, and MongoDB for secure storage. It verifies signatures in real time and is designed for high-security industries such as banking, legal documentation, and financial services.  

