const Profession = require("../models/Profession");
const Quality = require("../models/Quality");

const professionMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");

module.exports = async () => {
    // profession
    const professions = await Profession.find();
    if (professions.length !== professionMock.length) {
        await createInitialEntity(Profession, professionMock);
    }
    // qualities
    const qualities = await Quality.find();
    if (qualities.length !== qualitiesMock.length) {
        await createInitialEntity(Quality, qualitiesMock);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                console.log(e);
            }
        })
    );
}
