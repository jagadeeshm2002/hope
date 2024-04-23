const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true,
        index: true
    },
    slug: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productscategories',
        required: true,
    },
    seller_id: {
        type: String,
    },
    product_type: {
        type: String,
        required: true
    },
    product_gallery: {
        type: Array,
        required: true
    },
    original_price: {
        type: Number,
    },
    sale_price: {
        type: Number,
        required: true
    },
    variations: [{
        attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productsterms',
            required: true
        },
        terms: [
            {
                term: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'productsattributes',
                    required: true
                },
                sku: {
                    type: String,
                },
            }
        ]
    }],
    sku: {
        type: String,
    },
    quantity: {
        type: Number,
    },
}, { timestamps: true })

const productsAttributesSchema = new mongoose.Schema({
    attribute_name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
    }
}, { timestamps: true } )

const productsTermsSchema = new Schema({
    term_name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        required: false,
    },
    attribute_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    is_default: {
        type: Boolean,
        default: false
    },
})