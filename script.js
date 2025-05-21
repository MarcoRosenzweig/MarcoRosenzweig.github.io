async function includeHTML() {
  const elements = document.querySelectorAll('[include-html]');
  for (const el of elements) {
    const file = el.getAttribute('include-html');
    if (file) {
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to fetch ${file}`);

        const html = await res.text();
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Extract scripts before injecting content
        const scripts = temp.querySelectorAll('script');

        // Remove scripts from temp to avoid duplicate execution on insertion
        scripts.forEach(s => s.remove());

        el.innerHTML = temp.innerHTML;
        el.removeAttribute('include-html');

        // Now execute scripts synchronously
        for (const script of scripts) {
          const newScript = document.createElement('script');
          if (script.src) {
            await new Promise((resolve, reject) => {
              newScript.src = script.src;
              newScript.onload = resolve;
              newScript.onerror = reject;
              document.body.appendChild(newScript);
            });
          } else {
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
          }
        }

        if (window.MathJax && MathJax.typesetPromise) {
          MathJax.typesetPromise([el]).catch(err => console.error(err.message));
        }

        // Now scripts have executed, call initSlider if available
        if (typeof initSlider === 'function') {
          // console.log('Calling initSlider...');
          initSlider();
        } else {
          console.warn('initSlider is still not defined.');
        }
      } catch (err) {
        el.innerHTML = 'Content not found.';
        console.error(err);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', includeHTML);

function openModal() {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImage");
  const thumb = document.getElementById("thumbnail");

  modal.style.display = "block";
  modalImg.src = thumb.src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onload = function() {
  Prism.highlightAll();
};