'use strict';
var util = require('./../util/thinky'),
	thinky = require('thinky')(util.config),
	r = thinky.r,
	type = thinky.type;

// Users model
var Users = thinky.createModel("Users", {
	username: type.string().regex('[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])').required(), // Username needs to begin and end with an alphanumeric character, but can contain dashes
	email: type.string().email().required(),
	password: type.string().required(), // Salted hashed password
	salt: type.string().required(), // User salt
	firstName: type.string(),
	lastName: type.string(),
	addresses: [{ // Array of address objects
		address1: type.string(),
		address2: type.string(),
		postalCode: type.string(),
		state: type.string(),
		country: type.string()
	}],
	type: type.string(), // This is probably going to be an ID to a user types table
	isActive: type.boolean(), // So we can disable users
	createdDate: type.date(), // When the account was created
	modifiedDate: type.date(), // When the account was modified
	lastActivityDate: type.date() // Last time they logged in
});

// Products Model
var Products = thinky.createModel("Products", {
	id: type.string(),
	vendor: type.string().required(), // Vendor's username
	vendorProductNumber: type.string(), // Vendor's ID for their product in their system
	name: type.string().required(),
	shortDescription: type.string().required(), // A short description of the product to display in searches
	description: type.string().required(), // Full description
	salePrice: type.string().required(), // The price we sell the product for
	retailPrice: type.string().required(), // MSRP of the product
	supplyPrice: type.string().required(), // The price we pay the vendor
	shippingPrice: type.string(), // Vendors shipping price
	shippingType: type.string(), // Free Shipping, Flat Rate Shipping, Calculated Shipping
	quantity: type.number().integer(), // Product in stock
	isActive: type.boolean(), // So we can disable products
	smallImages: [{ // Array of Image objects
		url: type.string(), // URL to image
		sortOrder: type.number().integer() // Display order of images
	}],
	largeImages: [{
		url: type.string(), // URL to image
		sortOrder: type.number().integer() // Display order of images
	}],
	additionalInfo: [{ // Array of Objects that contain key and value
		name: type.string(), // Additional Info Key
		value: type.string() // Additional Info Value
	}],
	options: [type.string()], // Array of optionIds
	items: [type.string()], // Array of itemIds
	categories: [type.string()] // Array of categoryIds
});

// Items Model
var Items = thinky.createModel("Items", {
	id: type.string(),
	productId: type.string().required(),
	// These fields are optional. If not set they will default to the product values.
	name: type.string(),
	shortDescription: type.string(), // A short description of the item to display in searches
	description: type.string(), // Full description
	salePrice: type.string(), // The price we sell the item for
	retailPrice: type.string(), // MSRP of the item
	supplyPrice: type.string(), // The price we pay the vendor
	shippingPrice: type.string(), // Vendors shipping price
	shippingType: type.string(), // Free Shipping, Flat Rate Shipping, Calculated Shipping
	quantity: type.number().integer(), // Item in stock
	isActive: type.boolean(), // So we can disable items
	smallImages: [{ // Array of Image objects
		url: type.string(), // URL to image
		sortOrder: type.number().integer() // Display order of images
	}],
	largeImages: [{
		url: type.string(), // URL to image
		sortOrder: type.number().integer() // Display order of images
	}],
	additionalInfo: [{ // Array of Objects that contain key and value
		name: type.string(), // Additional Info Key
		value: type.string() // Additional Info Value
	}],
	// Array of options that describe this item
	options: [{
		optionId: type.string(),
		optionValueId: type.string()
	}]
})

// Categories Model
var Categories = thinky.createModel("Categories", {
	id: type.string(),
	parentId: type.string(), // Self referential ID.
	name: type.string(), // Category name
	isActive: type.boolean() // So we can disable categories
});

// Options Model
var Options = thinky.createModel("Options", {
	id: type.string(),
	name: type.string() // Option name IE: Shirt Size, Pants Size, Color
});

// OptionValues Model
var OptionValues = thinky.createModel("OptionValues", {
	id: type.string(),
	optionId: type.string(), // Foreign key to option
	name: type.string() // Option values IE: Small, Medium, Large
});