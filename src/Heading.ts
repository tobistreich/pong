export class Heading {
    private headingText: string;

    constructor(headingText: string) {
        this.headingText = headingText;
    }

    public createHeading(text: string) {
        const heading = document.createElement ('h2');
        heading.innerHTML = text;
        heading.style.position = 'absolute';
        heading.style.top = '6rem';
        heading.style.color = '#FFF';
        heading.style.fontFamily = 'Monospace';
        heading.style.textAlign = 'center';
        return heading;
    }
    public createStartGameHeading(headingText: string) {
        const heading = this.createHeading(headingText);
        document.body.appendChild(heading);

        setInterval(() => {
            heading.style.visibility = 
                heading.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    }

    public removeStartGameHeading() {
        const heading = document.querySelector('h2');
        if (heading) {
            const parent = heading.parentNode;
            if (parent) {
                parent.removeChild(heading);
            }
        }
    }
}