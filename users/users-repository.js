const {Users} = require("../schemas/schemas");
const getUser = (id) => {
    return Users.findById(id).then(res => ({id: res._id, todolists: res.todolists}));
}



exports.getUser = getUser;


