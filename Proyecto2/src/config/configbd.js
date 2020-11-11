const oracledb = require('oracledb');

cns = {
    user: "fernando",
    password: "fernando",
    connectString: "localhost/ORCLCDB.localdomain"
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;