var prev = null;
var prevParent = null;

function showRelated(parent) {
    var tag = parent.innerText;

    console.log(tag);
    console.log(document.getElementById("#"+tag));
    console.log(prev);

    newShownElement = document.getElementById("#"+tag);

    if (prev != newShownElement) {
        prev.style.display = 'none';
        newShownElement.style.display = '';
        parent.classList.toggle("related-tag-selected");
        prevParent.classList.toggle("related-tag-selected");
    }

    prev = newShownElement;
    prevParent = parent;
}

document.querySelectorAll(".tags-list li").forEach((element, index) => {
    if (index == 0) {
        prev = document.getElementById("#"+element.innerText);
        prev.style.display = '';
        element.classList.toggle("related-tag-selected");
        prevParent = element;
    }
    
    element.onmouseover = () => { showRelated(element); };
});