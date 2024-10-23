import Listing from '../models/listing.model.js'; 
import { errorHandler } from '../middleware/errorHandler.js';

// Controller function to create a new listing
export const createListing = async (req, res, next) => {
  try {
    // Create a new listing from request body data
    const listing = await Listing.create(req.body);
    // Send the created listing with a 201 status (Created)
    return res.status(201).json(listing);
  } catch (error) {
    // Pass error to the error handler middleware
    next(error);
  }
};

// Controller function to delete a listing by ID
export const deleteListing = async (req, res, next) => {
  // Find listing by ID from request parameters
  const listing = await Listing.findById(req.params.id);

  // If listing is not found, return 404 error
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Check if the authenticated user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    // Delete the listing if the user is authorized
    await Listing.findByIdAndDelete(req.params.id);
    // Send a success message with 200 status
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    // Pass error to the error handler middleware
    next(error);
  }
};

// Controller function to update a listing by ID
export const updateListing = async (req, res, next) => {
  // Find the listing by ID from request parameters
  const listing = await Listing.findById(req.params.id);
  
  // If listing is not found, return 404 error
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  
  // Check if the authenticated user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    // Update the listing with new data from the request body
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id, // ID of the listing to update
      req.body, // New data for the listing
      { new: true } // Return the updated document
    );
    // Send the updated listing with 200 status
    res.status(200).json(updatedListing);
  } catch (error) {
    // Pass error to the error handler middleware
    next(error);
  }
};

// Controller function to get a single listing by ID
export const getListing = async (req, res, next) => {
  try {
    // Find listing by ID from request parameters
    const listing = await Listing.findById(req.params.id);
    
    // If listing is not found, return 404 error
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    // Send the found listing with 200 status
    res.status(200).json(listing);
  } catch (error) {
    // Pass error to the error handler middleware
    next(error);
  }
};

// Controller function to get multiple listings based on query filters
export const getListings = async (req, res, next) => {
    try {
      // Parse query parameters for pagination and filtering
      const limit = parseInt(req.query.limit) || 9; // Limit of listings per page (default 9)
      const startIndex = parseInt(req.query.startIndex) || 0; // Start index for pagination (default 0)
      let offer = req.query.offer; // Offer filter (e.g., sale/rent)
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] }; // If no offer filter, show all (sale/rent)
      }
  
      let furnished = req.query.furnished; // Filter for furnished listings
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] }; // If no filter, show both furnished/unfurnished
      }
  
      let parking = req.query.parking; // Filter for parking availability
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] }; // If no filter, show both parking/no parking
      }
  
      let type = req.query.type; // Filter for listing type (sale/rent)
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] }; // If no filter, show both sale and rent
      }
  
      const searchTerm = req.query.searchTerm || ''; // Search term filter
      const sort = req.query.sort || 'createdAt'; // Sort field (default createdAt)
      const order = req.query.order || 'desc'; // Sort order (default descending)
  
      // Find listings based on the filters
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' }, // Search by name (case-insensitive)
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order }) // Sort the listings by the specified field and order
        .limit(limit) // Limit the number of listings
        .skip(startIndex); // Skip to the start index for pagination
  
      // Send the filtered listings with 200 status
      return res.status(200).json(listings);
    } catch (error) {
      // Pass error to the error handler middleware
      next(error);
    }
  };