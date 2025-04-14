const express = require('express');
const {Listing, User} = require('../models');

const getListings = async (req , res) => {
    try{
        const listings = await Listing.findAll({
            include : [{ model : User, attributes : ['name'], as: 'users' }],
        });
        res.status(201).json(listings);
    } catch (error){
        console.error(error);
        res.status(500).json({error : 'Failed to fetch listings.'});
    }
}

const postItem = async (req , res) => {
    try{
        const {title, description, price} = req.body;

        if (!title || !description || !price){
            return res.status(400).json({ error: 'Title, description and price are required.' });
        }

        const newItem = await Listing.create({
            user_id: req.user.id,
            title,
            description,
            price,
        });

        const listingWithUser = await Listing.findOne({
            where: { id: newItem.id },
            include: {
            model: User,
            attributes: ['id', 'name'], 
            as: 'users'
            },
        });

        res.status(201).json(listingWithUser);
    } catch{
        console.error(error);
        res.status(500).json({ error: 'Failed to post item.' });
    }
};

const getListingById = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findByPk(id,{
            include: [{ model: User, attributes: ['name'], as: 'users' }],
        });

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }

        res.status(200).json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch listing.' });
    }
};


module.exports = { getListings, postItem , getListingById};