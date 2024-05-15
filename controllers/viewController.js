const mongoose = require('mongoose');
const VolInfo = mongoose.model('volunteerInfo')
const ProduceInfo = mongoose.model('produceInfo')

exports.homepage = async (req, res) => {
let totalAmt;
const result = await ProduceInfo.aggregate([
  {
    $group: {
      _id: null,
      totalAmount: { $sum: "$description" }
    }
  }
]);
totalAmt = result[0].totalAmount;
console.log("2 Total amount:", totalAmt);
    
    
  res.render('layout', {totalAmount : totalAmt});
};

exports.loginPage = (req, res) => {
    res.render('login');
}
/*
exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
  //res.json(stores);
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.homePage = (req,res)=> {
    res.render('home');
}*/

exports.aboutPage = (req,res) => {
    res.render('about');
}

exports.volunteerPage = (req,res) => {
    res.render('volunteer');
}

exports.contactPage = (req,res) => {
    res.render('contact');
}
exports.volunteerInfo = (req,res) => {
    res.render('volunteerInfo');
}

exports.produceInfo = (req,res) => {
    res.render('produceInfo');
}

// create + update + delete VOLUNTEERS

exports.createVolunteer = async (req, res) => {
    const volInfo = await (new VolInfo(req.body)).save();
    res.redirect('/viewAllVolunteers')
//    res.render('volunteerInfoPart2');
}

exports.showVolunteers = async (req, res) => {
    const volInfo = await VolInfo.find();
    res.render('volunteerInfoPart2', { volInfo});
}

exports.editVolunteer = async (req,res) => {
    const volInfo = await VolInfo.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new: true,
        //runValidators: true
    }).exec();
    res.render('volunteerInfo', {volInfo});
}

exports.deleteVolunteer = async (req, res) => {
    const volInfo = await VolInfo.findOneAndDelete({ _id: req.params.id});
    res.redirect('/viewAllVolunteers');
}

// create + update + delete PRODUCE INFO


exports.createProduce = async (req, res) => {
    const produceInfo = await (new ProduceInfo(req.body)).save();
    res.redirect('/viewAllProduceInfo')
//    res.render('volunteerInfoPart2');
}

exports.showProduce = async (req, res) => {
    const produceInfo = await ProduceInfo.find();
    res.render('produceInfoPart2', { produceInfo});
}

exports.editProduce = async (req,res) => {
    const produceInfo = await ProduceInfo.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new: true,
        //runValidators: true
    }).exec();
    res.render('produceInfo', {produceInfo});
}

exports.deleteProduce = async (req, res) => {
    const produceInfo = await ProduceInfo.findOneAndDelete({ _id: req.params.id});
    res.redirect('/viewAllProduceInfo');
}

