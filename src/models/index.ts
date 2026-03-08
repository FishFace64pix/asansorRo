
import mongoose, { Schema } from 'mongoose';

// Blog Post Schema
const BlogPostSchema = new Schema({
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    title: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    excerpt: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    content: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    date: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    readTime: { type: Number, default: 5 },
}, { timestamps: true });

// Project Schema
const ProjectSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    description: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    image: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String },
    year: { type: String },
}, { timestamps: true });

// Product Schema
const ProductSchema = new Schema({
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    name: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    description: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    image: { type: String, required: true },
    features: [{ type: String }],
    specs: { type: Schema.Types.Mixed },
    category: { type: String, required: true },
}, { timestamps: true });

// Reference/Partner Schema
const ReferenceSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    logo: { type: String },
}, { timestamps: true });

// Models
// Use "models.ModelName" to check if model already exists (for hot reload)
export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const Reference = mongoose.models.Reference || mongoose.model('Reference', ReferenceSchema);

// Testimonial Schema
const TestimonialSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String },
    content: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    image: { type: String },
}, { timestamps: true });

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
