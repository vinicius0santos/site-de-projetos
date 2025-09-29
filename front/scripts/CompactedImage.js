class CompactedImage{
    constructor(file, document, maxWidth = 1280, quality = 0.8){
        this.file = file;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.maxWidth = maxWidth;
        this.quality = quality;
    }

    async getBlob(){
        const data = this.file.files[0];

        if(data){
            const reader = new FileReader();
            reader.readAsDataURL(data);

            const readerResult = new Promise(resolve => {
                reader.onload = () => resolve(reader.result); 
            })

            const img = new Image();
            img.src = await readerResult;

            await new Promise(resolve => {
                img.onload = () => {
                    const scale = Math.min(1, this.maxWidth / img.width);
    
                    this.canvas.width = img.width * scale;
                    this.canvas.height = img.height * scale;
    
                    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                    resolve()
                }
            })

            const blob = new Promise(resolve => {
                this.canvas.toBlob(function process(blob){
                    if(blob.size / 1024 > 300 && this.quality > 0.1) {
                        this.quality -= 0.05;
                        this.canvas.toBlob(process, 'image/webp', this.quality);
                    }
                    else{
                        resolve(blob);
                    }
                }, "image/webp", this.quality);
            })
            
            return blob;
        }
        else return false;
    }
}