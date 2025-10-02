const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/profile-pictures');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp and user ID
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${req.user.id}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

/**
 * Upload profile picture
 */
router.post('/upload-picture', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const userId = req.user.id;
    const client = new MongoClient(process.env.DATABASE_URL);

    try {
      await client.connect();
      const db = client.db();

      // Get user's current profile picture
      const user = await db.collection('users').findOne(
        { _id: new ObjectId(userId) },
        { projection: { profile_picture: 1, has_custom_picture: 1 } }
      );

      // Delete old profile picture if it exists and is custom
      if (user && user.has_custom_picture && user.profile_picture) {
        const oldPicturePath = path.join(__dirname, '..', user.profile_picture);
        if (fs.existsSync(oldPicturePath)) {
          fs.unlinkSync(oldPicturePath);
        }
      }

      // Create relative path for database storage
      const relativePath = path.join('uploads', 'profile-pictures', req.file.filename);

      // Update user with new profile picture
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            profile_picture: relativePath,
            has_custom_picture: true,
            updated_at: new Date()
          }
        }
      );

      res.json({
        success: true,
        message: 'Profile picture uploaded successfully',
        data: {
          profile_picture: relativePath,
          has_custom_picture: true
        }
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload profile picture'
    });
  }
});

/**
 * Delete profile picture and revert to default avatar
 */
router.delete('/delete-picture', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const client = new MongoClient(process.env.DATABASE_URL);

    try {
      await client.connect();
      const db = client.db();

      // Get user's current profile picture
      const user = await db.collection('users').findOne(
        { _id: new ObjectId(userId) },
        { projection: { profile_picture: 1, has_custom_picture: 1, gender: 1 } }
      );

      // Delete custom profile picture file if it exists
      if (user && user.has_custom_picture && user.profile_picture) {
        const picturePath = path.join(__dirname, '..', user.profile_picture);
        if (fs.existsSync(picturePath)) {
          fs.unlinkSync(picturePath);
        }
      }

      // Update user to remove custom picture
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            profile_picture: null,
            has_custom_picture: false,
            updated_at: new Date()
          }
        }
      );

      res.json({
        success: true,
        message: 'Profile picture deleted successfully',
        data: {
          profile_picture: null,
          has_custom_picture: false
        }
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete profile picture'
    });
  }
});

/**
 * Decrypt NIN for display in profile (read-only)
 */
router.post('/decrypt-nin', auth, async (req, res) => {
  try {
    const { aes_encrypted, nin_iv } = req.body;
    
    if (!aes_encrypted || !nin_iv) {
      return res.status(400).json({
        success: false,
        message: 'Missing required NIN data'
      });
    }

    // Decrypt NIN for display
    const { decryptNINForDisplay } = require('../utils/crypto');
    const result = decryptNINForDisplay(aes_encrypted, nin_iv);
    
    if (result.hasNIN && result.decrypted) {
      res.json({
        success: true,
        decryptedNIN: result.decrypted,
        message: 'NIN decrypted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message || 'Failed to decrypt NIN'
      });
    }
    
  } catch (error) {
    console.error('Error decrypting NIN for display:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to decrypt NIN'
    });
  }
});

/**
 * Get profile picture (serves the image file)
 */
router.get('/picture/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const picturePath = path.join(__dirname, '../uploads/profile-pictures', filename);
    
    if (fs.existsSync(picturePath)) {
      res.sendFile(picturePath);
    } else {
      res.status(404).json({
        success: false,
        message: 'Profile picture not found'
      });
    }
  } catch (error) {
    console.error('Error serving profile picture:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to serve profile picture'
    });
  }
});

module.exports = router;
