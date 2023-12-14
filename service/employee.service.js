const db = require('../db')

module.exports.getAllEmployees = async () => {
    const [records] = await db.query("SELECT * FROM employees")
    return records;
}

module.exports.getEmployeeById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM employees WHERE id = ?", [id])
    return record;
}

module.exports.deleteEmployee = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM employees WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addOrEditEmployee = async (obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?,?)",
        [id, obj.first_name, obj.last_name, obj.email_id,obj.password])
    return affectedRows;
}

module.exports.loginEmployee = async (obj) => {
    const [[record]] = await db.query("SELECT * FROM employees WHERE email_id = ?", [obj.email_id]);

    if(record!==undefined && record.password===obj.password){
        return true;
    }
    return false;
    
}