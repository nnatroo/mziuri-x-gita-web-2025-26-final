const emailInput = document.getElementById('news-email-input');
const  submitBtn = document.getElementById('submit-btn');
const newsletterForm = document.getElementById('news-inline-form');
const wrapper = document.querySelector('.news-form-link-wrapper');


if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value;
        submitBtn.disabled = true;

        try {
            const response = await fetch('/blog/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();

            if (response.ok) {
                // 1. ვმალავთ ფორმას დროებით
                newsletterForm.style.display = 'none';

                // 2. ვამატებთ მადლობის ტექსტს ფორმის ნაცვლად
                const msg = document.createElement('p');
                msg.id = 'temp-success-msg';
                msg.style.cssText = "color: #7F56D9; font-family: Inter; font-weight: 600; font-size: 18px; text-align: center; margin-bottom: 16px;";
                msg.innerText = "🎉 Thank you for subscribing!";
                wrapper.insertBefore(msg, newsletterForm);

                // 3. 3 წამის შემდეგ ვშლით ტექსტს და ვაჩენთ ისევ ფორმას
                setTimeout(() => {
                    msg.remove(); // მადლობის ტექსტის წაშლა
                    newsletterForm.style.display = 'flex'; // ფორმის გამოჩენა
                    emailInput.value = ''; // ინპუტის გასუფთავება
                    submitBtn.disabled = false; // ღილაკის გააქტიურება
                }, 3000);

            } else {
                alert(data.message || 'Something went wrong.');
                submitBtn.disabled = false;
            }
        } catch (err) {
            console.error(err);
            alert('სერვერთან კავშირი ვერ დამყარდა.');
            submitBtn.disabled = false;
        }
    });
}



