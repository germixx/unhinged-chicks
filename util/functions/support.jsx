
const slugify = (sentence) => sentence.toLowerCase().replace(/,/g, '').replace(/\s+/g, '-');


module.exports = {
    slugify
}