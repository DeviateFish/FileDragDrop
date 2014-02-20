var FileDragDrop = (function () {
    var FileDragDrop = function (target, onComplete) {
        if (window.File && window.FileList && window.FileReader) {
            this.target = target;
            this.onComplete = onComplete;
            this.target.addEventListener('drop', this.handleDropEvent.bind(this), false);
            this.target.addEventListener('dragover', cancelEvent, false);
            this.target.addEventListener('dragleave', cancelEvent, false);
        } else {
            throw 'File reading capabilities are not supported by this browser!';
        }
    };

    FileDragDrop.prototype.handleDropEvent = function (e) {
        cancelEvent(e);
        var files = e.dataTransfer && e.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            this.handleFile(files[i]);
        }
        return false;
    };

    FileDragDrop.prototype.handleFile = function (file) {
        var reader = new window.FileReader(),
            that = this;
        reader.onload = function (e) {
            if (e && e.target && e.target.result) {
                that.onComplete(e.target.result, file.name);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return FileDragDrop;
}());
