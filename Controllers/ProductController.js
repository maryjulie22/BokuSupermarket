const Product = require ('../Models/Products');
const upload = require('../Middleware/upload');
const sendEmail= require('../Middleware/emailsender');

exports.createProduct = async (req, res) => {

    upload.single('image')(req, res, async (err) => {

        if (err) {
            return res.status(400).json({
                message: "Error uploading image",
                error: err.message
            });
        }

        try {
            const {
                name,
                size,
                description,
                price,
                quantity
            } = req.body;

            console.log("BODY:", req.body);
            console.log("FILE:", req.file);

            // Check required fields
            if (!name || !size || !description || !price || !quantity) {
                return res.status(400).json({
                    message: "Please provide all required fields"
                });
            }

            // Check if image was uploaded
            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload an image"
                });
            }

            const product = new Product({
                name,
                size,
                description,
                price,
                quantity,

                // Cloudinary gives us the uploaded image URL
                image: req.file.path
            });

            await product.save();

            // send email notification 
           const subject = "New Product Created";
           const text = `A new product has been created:\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}`;
           await sendEmail("peterorji518@gmail.com", subject, text);


            res.status(201).json({
                message: "Product created successfully",
                product
            });

        } catch (error) {

            console.log(error);

            res.status(400).json({
                message: "Error creating product",
                error: error.message
            });
        }
    });
};


exports.updateProduct = async (req, res) => {
try{
    const { id } = req.params;
    const { name, size, description, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity }, { new: true });
    res.status(200).json({message: "product updated successfully", product});
} catch(error){
    res.status(400).json({message:"Error updating product", error: error.message });
}
};

exports.getAllProductById = async (req, res) => {
    try{
        const {id} = req.params;

        const product= await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product found", product});
    } catch(error){
        res.status(400).json({message:"Error fetching product", error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json({message: "Products found", products});
    } catch(error){
        res.status(400).json({message:"Error fetching products", error: error.message });
    }
};
