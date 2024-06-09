const multer = require('multer')
const upload = multer()
const cloudinary = require('../configs/cloundinary')
const { asyncHandler } = require('../helpers/handError')

const handleUploadImage = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    next()
  }

  const pattern = /^.*\.(jpg|jpeg|png|gif|bmp|tiff)$/i
  const images = req.files.reduce((files, file) => {
    if (pattern.test(file.originalname)) {
      const asyncImage = new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((err, uploadResult) => {
          if (err) reject(err)
          const { public_id, url } = uploadResult
          return resolve({ public_id, url: url.replace(/http/g, 'https') })
        }).end(file.buffer)
      })
      files.push(asyncImage);
    }
    return files;
  }, []);

  const data = await Promise.all(images)
  console.log(data)

  req.body.product_images = data
  next()
})

const handleUploadSingleImage = asyncHandler(async (req, res, next) => {
  const image = req.file
  if (!image) next()

  const data = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((err, uploadResult) => {
      if (err) reject(err)
      const { public_id, url } = uploadResult
      return resolve({ public_id, url: url.replace('http', 'https') })
    }).end(image.buffer)
  })

  req.image = data
  next()
})

module.exports = {
  upload,
  handleUploadImage,
  handleUploadSingleImage
}