interface Education {
    institution: string;
    degree: string;
    year: string;
}

interface Experience {
    company: string;
    position: string;
    duration: string;
    description: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    experience: Experience[];
    skills: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
    const addExperienceBtn = document.getElementById('addExperience') as HTMLButtonElement;
    const educationFields = document.getElementById('educationFields') as HTMLDivElement;
    const experienceFields = document.getElementById('experienceFields') as HTMLDivElement;
    const previewContent = document.getElementById('previewContent') as HTMLDivElement;
    const resumePreview = document.getElementById('resumePreview') as HTMLDivElement;
    const downloadPDFBtn = document.getElementById('downloadPDF') as HTMLButtonElement;

    addEducationBtn.addEventListener('click', () => addField('education'));
    addExperienceBtn.addEventListener('click', () => addField('experience'));

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const resumeData = processFormData(formData);
        displayResume(resumeData);
    });



    downloadPDFBtn.addEventListener('click', () => {
        alert('PDF download functionality would be implemented here.');
        // In a real implementation, you would use a library like jsPDF to generate the PDF
    });

    function addField(type: 'education' | 'experience'): void {
        const container = type === 'education' ? educationFields : experienceFields;
        const newField = container.children[0].cloneNode(true) as HTMLDivElement;
        const inputs = newField.querySelectorAll('input, textarea');
        inputs.forEach(input => (input as HTMLInputElement).value = '');
        container.appendChild(newField);
    }

    function processFormData(formData: FormData): ResumeData {
        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: [],
            experience: [],
            skills: formData.get('skills') as string
        };

        const institutions = formData.getAll('institution[]') as string[];
        const degrees = formData.getAll('degree[]') as string[];
        const years = formData.getAll('year[]') as string[];

        for (let i = 0; i < institutions.length; i++) {
            resumeData.education.push({
                institution: institutions[i],
                degree: degrees[i],
                year: years[i]
            });
        }

        const companies = formData.getAll('company[]') as string[];
        const positions = formData.getAll('position[]') as string[];
        const durations = formData.getAll('duration[]') as string[];
        const descriptions = formData.getAll('description[]') as string[];

        for (let i = 0; i < companies.length; i++) {
            resumeData.experience.push({
                company: companies[i],
                position: positions[i],
                duration: durations[i],
                description: descriptions[i]
            });
        }

        return resumeData;
    }

    function displayResume(data: ResumeData): void {
        let html = `
            <h2>${data.name}</h2>
            <p><i class="fas fa-envelope"></i> ${data.email} | <i class="fas fa-phone"></i> ${data.phone}</p>
            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
            <ul>
                ${data.education.map(edu => `
                    <li>
                        <strong>${edu.institution}</strong> - ${edu.degree} (${edu.year})
                    </li>
                `).join('')}
            </ul>
            <h3><i class="fas fa-briefcase"></i> Experience</h3>
            <ul>
                ${data.experience.map(exp => `
                    <li>
                        <strong>${exp.company}</strong> - ${exp.position} (${exp.duration})
                        <p>${exp.description}</p>
                    </li>
                `).join('')}
            </ul>
            <h3><i class="fas fa-cogs"></i> Skills</h3>
            <p>${data.skills}</p>
        `;

        previewContent.innerHTML = html;
        resumePreview.classList.remove('hidden');
    }
});


// Initialize form and preview elements
document.getElementById('resumeForm')?.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form submission
    populatePreview();
});

document.getElementById('saveChanges')?.addEventListener('click', function () {
    saveEditedContent();
});

// Populate Preview Function
function populatePreview() {
    const name = (document.getElementById('name') as HTMLInputElement | null)?.value || '';
    const email = (document.getElementById('email') as HTMLInputElement | null)?.value || '';
    const phone = (document.getElementById('phone') as HTMLInputElement | null)?.value || '';

    const previewName = document.getElementById('previewName');
    if (previewName) previewName.textContent = name;

    const previewContact = document.getElementById('previewContact');
    if (previewContact) previewContact.textContent = `Email: ${email} | Phone: ${phone}`;

    const skillsText = (document.getElementById('skills') as HTMLTextAreaElement | null)?.value || '';
    const skills = skillsText.split(',');
    const previewSkills = document.getElementById('previewSkills');
    if (previewSkills) {
        previewSkills.innerHTML = '';  // Clear existing skills
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill.trim();
            previewSkills.appendChild(li);
        });
    }

    const educationFields = document.querySelectorAll('#educationFields .education-entry');
    const previewEducation = document.getElementById('previewEducation');
    if (previewEducation) {
        previewEducation.innerHTML = '';  // Clear existing entries
        educationFields.forEach(entry => {
            const institution = (entry.querySelector('input[name="institution[]"]') as HTMLInputElement | null)?.value || '';
            const degree = (entry.querySelector('input[name="degree[]"]') as HTMLInputElement | null)?.value || '';
            const year = (entry.querySelector('input[name="year[]"]') as HTMLInputElement | null)?.value || '';

            const div = document.createElement('div');
            div.innerHTML = `<h3>${institution}</h3><p>${degree} - ${year}</p>`;
            previewEducation.appendChild(div);
        });
    }

    const experienceFields = document.querySelectorAll('#experienceFields .experience-entry');
    const previewExperience = document.getElementById('previewExperience');
    if (previewExperience) {
        previewExperience.innerHTML = '';  // Clear existing entries
        experienceFields.forEach(entry => {
            const company = (entry.querySelector('input[name="company[]"]') as HTMLInputElement | null)?.value || '';
            const position = (entry.querySelector('input[name="position[]"]') as HTMLInputElement | null)?.value || '';
            const duration = (entry.querySelector('input[name="duration[]"]') as HTMLInputElement | null)?.value || '';
            const description = (entry.querySelector('textarea[name="description[]"]') as HTMLTextAreaElement | null)?.value || '';

            const div = document.createElement('div');
            div.innerHTML = `<h3>${company}</h3><p>${position} (${duration})</p><p>${description}</p>`;
            previewExperience.appendChild(div);
        });
    }

    document.getElementById('resumePreview')?.classList.remove('hidden');
}

// function for editablity
function saveEditedContent() {
    // Update form fields with edited preview content
    const name = document.getElementById('previewName')?.textContent || '';
    (document.getElementById('name') as HTMLInputElement | null)!.value = name;

    const contactInfo = document.getElementById('previewContact')?.textContent || '';
    const [email, phone] = contactInfo.split('|').map(info => info.trim().split(': ')[1] || '');

    (document.getElementById('email') as HTMLInputElement | null)!.value = email || '';
    (document.getElementById('phone') as HTMLInputElement | null)!.value = phone || '';

    // Get edited skills
    const skillsList = document.getElementById('previewSkills')?.textContent || '';
    (document.getElementById('skills') as HTMLTextAreaElement | null)!.value = skillsList;

    alert('Changes saved to the form!');
}

// for deleting

function deleteEntry(button: HTMLButtonElement, type: 'education' | 'experience'): void {
    const entryToRemove = button.closest(`.${type}-entry`) as HTMLDivElement;
    const container = entryToRemove.parentElement as HTMLDivElement;
    
    if (container.children.length > 1) {
        container.removeChild(entryToRemove);
    } else {
        alert(`You must have at least one ${type} entry.`);
    }
}


//for profile picture

document.getElementById('profilePicture')?.addEventListener('change', function(event) {
    const input = event.target as HTMLInputElement;
    const previewContainer = document.getElementById('profilePicturePreview');
    if (input.files && input.files[0] && previewContainer) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewContainer.innerHTML = `<img src="${e.target?.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
});





document.getElementById('getPDF')?.addEventListener('click', () => {
    generatePDF();
});

async function generatePDF() {
    const jsPDF = (window as any).jspdf?.jsPDF; // Safely access jsPDF from window
    if (!jsPDF) {
        alert("jsPDF library is not loaded.");
        return;
    }

    const doc = new jsPDF();
    const resumePreview = document.getElementById('resumePreview');

    if (resumePreview) {
        // Convert resumePreview to canvas using html2canvas
        const canvas = await (window as any).html2canvas(resumePreview);
        const imgData = canvas.toDataURL('image/png');

        // Calculate dimensions for the PDF
        const imgWidth = 190; // Adjust as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image to PDF
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        doc.save('resume.pdf');
    } else {
        alert('Resume preview not available.');
    }
}
