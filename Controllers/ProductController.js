const Product = require ('../Models/Products');

exports.createProduct = async (req, res) => {
    try{
        const { name, size, description, price, quantity} = req.body;
        
        const product = new Product (
            {
                name,
                size,
                description,
                price,
                quantity
            }
        );
        await product.save();
        res.status(201).json({message: "product created successfully", product});
    } catch(error){
        res.status(400).json({message:"Error creating product", error: error.message });
    }
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

