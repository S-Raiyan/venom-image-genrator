const generateImage = async (req, res) => {
    try {
        const { prompt, style } = req.body;

        const imageUrl =
            `https://image.pollinations.ai/prompt/${encodeURIComponent(`${prompt} ${style}`)}`;

        res.json({
            imageUrl
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Image generation failed"
        });
    }
};

module.exports = { generateImage };