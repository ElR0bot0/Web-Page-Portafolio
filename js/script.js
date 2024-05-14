function resizeIframe(iframe) {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

window.addEventListener('load', function() {
    var aboutIframe = document.getElementById('about-iframe');
    var projectsIframe = document.getElementById('projects-iframe');

    aboutIframe.onload = function() {
        resizeIframe(aboutIframe);
    };

    projectsIframe.onload = function() {
        resizeIframe(projectsIframe);
    };
});