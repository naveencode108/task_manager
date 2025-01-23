import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
    try {
        let { name, mobile: phone, email } = req.body;

        let userId = req.userId;


        if (!name || !phone || !email) return res.json({ success: false, message: 'All fields are required' });

        let newContact = await Contact.create({
            userId,
            name,
            email,
            phone
        })

        return res.json({ success: true, data: newContact, message: "Contact Added" });
    }
    catch (er) {
        return res.json({ success: false, message: er.message });
    }
}

export const getContact = async (req, res) => {
    try {
        let userId = req.userId;

        let contact = await Contact.find({ userId });

        return res.json({ success: true, data: contact });

    }
    catch (er) {
        return res.json({ success: false, message: er.message })
    }
}

export const deleteContact = async (req, res) => {
    try {
        let { id } = req.body;

        if (!id) return res.json({ success: false, message: 'something went wrong' });

        let removeContact = await Contact.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Contact Deleted' });
    } catch (er) {
        return res.json({ success: false, message: er.message });
    }
}

export const editContact = async (req, res) => {
    try {
        let userId = req.userId;

        let { name, mobile: phone, email,id:_id } = req.body;

        if (!name || !phone || !email) return res.json({ success: false, message: 'All fields are required' });

        let find = await Contact.findOne({_id});

        if (find) {
            find.name = name;
            find.phone = phone;
            find.email = email;
        }

        await find.save();

        return res.json({ success: true, message: 'Contact Updated',data:find })

    }
    catch (er) {
        return res.json({ success: false, message: er.message });
    }
}