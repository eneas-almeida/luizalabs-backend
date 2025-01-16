const messageAdapter = (json) => {
    const trace = [];
    let base = null;
    let func = null;

    json.error.frames.forEach((frame) => {
        if (frame.file) {
            [base] = frame.file.split('/');

            if (base === 'src') {
                func = frame.calleeShort || 'anonymous';

                trace.push({
                    path: frame.file,
                    func,
                    line: frame.line,
                });
            }
        }
    });

    return {
        message: json.error.message,
        trace,
    };
};

module.exports = {
    messageAdapter,
};
