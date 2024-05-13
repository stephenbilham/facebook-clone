const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
			text: true,
		},
		last_name: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
			text: true,
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			trim: true,
			text: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			},
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
			validate(value) {
				if (value.toLowerCase().includes("password")) {
					throw new Error('Password cannot contain "password"');
				}
			},
		},
		picture: {
			type: String,
			trim: true,
			default:
				"https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
		},
		cover: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			required: [true, "gender is required"],
			trim: true,
		},
		bYear: {
			type: Number,
			required: true,
			trim: true,
		},
		bMonth: {
			type: Number,
			required: true,
			trim: true,
		},
		bDay: {
			type: Number,
			required: true,
			trim: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
		requests: {
			type: Array,
			default: [],
		},
		search: [
			{
				user: {
					type: ObjectId,
					ref: "User",
				},
			},
		],
		details: {
			bio: {
				type: String,
			},
			otherName: {
				type: String,
			},
			job: {
				type: String,
			},
			workplace: {
				type: String,
			},
			highSchool: {
				type: String,
			},
			college: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			hometown: {
				type: String,
			},
			relationship: {
				type: String,
				enum: ["Single", "In a relationship", "Married", "Divorced"],
			},
			instagram: {
				type: String,
			},
		},
		savedPosts: [
			{
				post: {
					type: ObjectId,
					ref: "Post",
				},
				savedAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
