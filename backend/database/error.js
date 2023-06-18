export const handleErrors = (code) => {

    if(!code){
        return{
            status: 500,
            message: "server error, unknown code",
        };
    }

    switch (code) {
        case "22P02":
        return {
            status: 400,
            message: "invalid format, only numbers allowed",
        };
        case "28P01":
        return {
            status: 400,
            message: "Incorrect postgres password",
        };
        case "42601":
        return {
            status: 400,
            message: "Incorrect postgres judgment",
        };
        case "42P01":
        return {
            status: 400,
            message: "relation name table does not exist",
        };
        case "3D000":
        return {
            status: 400,
            message: "Database does not exist",
        };
        case "ECONNREFUSED":
        return {
            status: 400,
            message: "Failed to connect to the database",
        };
        case "400":
        return {
            status: 404,
            message:
            "All fields are required: title, img, description",
        };
        case "404":
        return {
            status: 404,
            message: "File not found",
        };
        default:
        return {
            status: 500,
            message: "Internal Server Error",
        };
    }
};
