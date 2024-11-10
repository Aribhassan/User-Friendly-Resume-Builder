var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d;
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var addEducationBtn = document.getElementById('addEducation');
    var addExperienceBtn = document.getElementById('addExperience');
    var educationFields = document.getElementById('educationFields');
    var experienceFields = document.getElementById('experienceFields');
    var previewContent = document.getElementById('previewContent');
    var resumePreview = document.getElementById('resumePreview');
    var downloadPDFBtn = document.getElementById('downloadPDF');
    addEducationBtn.addEventListener('click', function () { return addField('education'); });
    addExperienceBtn.addEventListener('click', function () { return addField('experience'); });
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        var resumeData = processFormData(formData);
        displayResume(resumeData);
    });
    downloadPDFBtn.addEventListener('click', function () {
        alert('PDF download functionality would be implemented here.');
        // In a real implementation, you would use a library like jsPDF to generate the PDF
    });
    function addField(type) {
        var container = type === 'education' ? educationFields : experienceFields;
        var newField = container.children[0].cloneNode(true);
        var inputs = newField.querySelectorAll('input, textarea');
        inputs.forEach(function (input) { return input.value = ''; });
        container.appendChild(newField);
    }
    function processFormData(formData) {
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: [],
            experience: [],
            skills: formData.get('skills')
        };
        var institutions = formData.getAll('institution[]');
        var degrees = formData.getAll('degree[]');
        var years = formData.getAll('year[]');
        for (var i = 0; i < institutions.length; i++) {
            resumeData.education.push({
                institution: institutions[i],
                degree: degrees[i],
                year: years[i]
            });
        }
        var companies = formData.getAll('company[]');
        var positions = formData.getAll('position[]');
        var durations = formData.getAll('duration[]');
        var descriptions = formData.getAll('description[]');
        for (var i = 0; i < companies.length; i++) {
            resumeData.experience.push({
                company: companies[i],
                position: positions[i],
                duration: durations[i],
                description: descriptions[i]
            });
        }
        return resumeData;
    }
    function displayResume(data) {
        var html = "\n            <h2>".concat(data.name, "</h2>\n            <p><i class=\"fas fa-envelope\"></i> ").concat(data.email, " | <i class=\"fas fa-phone\"></i> ").concat(data.phone, "</p>\n            <h3><i class=\"fas fa-graduation-cap\"></i> Education</h3>\n            <ul>\n                ").concat(data.education.map(function (edu) { return "\n                    <li>\n                        <strong>".concat(edu.institution, "</strong> - ").concat(edu.degree, " (").concat(edu.year, ")\n                    </li>\n                "); }).join(''), "\n            </ul>\n            <h3><i class=\"fas fa-briefcase\"></i> Experience</h3>\n            <ul>\n                ").concat(data.experience.map(function (exp) { return "\n                    <li>\n                        <strong>".concat(exp.company, "</strong> - ").concat(exp.position, " (").concat(exp.duration, ")\n                        <p>").concat(exp.description, "</p>\n                    </li>\n                "); }).join(''), "\n            </ul>\n            <h3><i class=\"fas fa-cogs\"></i> Skills</h3>\n            <p>").concat(data.skills, "</p>\n        ");
        previewContent.innerHTML = html;
        resumePreview.classList.remove('hidden');
    }
});
// Initialize form and preview elements
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    populatePreview();
});
(_b = document.getElementById('saveChanges')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    saveEditedContent();
});
// Populate Preview Function
function populatePreview() {
    var _a, _b, _c, _d, _e;
    var name = ((_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value) || '';
    var email = ((_b = document.getElementById('email')) === null || _b === void 0 ? void 0 : _b.value) || '';
    var phone = ((_c = document.getElementById('phone')) === null || _c === void 0 ? void 0 : _c.value) || '';
    var previewName = document.getElementById('previewName');
    if (previewName)
        previewName.textContent = name;
    var previewContact = document.getElementById('previewContact');
    if (previewContact)
        previewContact.textContent = "Email: ".concat(email, " | Phone: ").concat(phone);
    var skillsText = ((_d = document.getElementById('skills')) === null || _d === void 0 ? void 0 : _d.value) || '';
    var skills = skillsText.split(',');
    var previewSkills = document.getElementById('previewSkills');
    if (previewSkills) {
        previewSkills.innerHTML = ''; // Clear existing skills
        skills.forEach(function (skill) {
            var li = document.createElement('li');
            li.textContent = skill.trim();
            previewSkills.appendChild(li);
        });
    }
    var educationFields = document.querySelectorAll('#educationFields .education-entry');
    var previewEducation = document.getElementById('previewEducation');
    if (previewEducation) {
        previewEducation.innerHTML = ''; // Clear existing entries
        educationFields.forEach(function (entry) {
            var _a, _b, _c;
            var institution = ((_a = entry.querySelector('input[name="institution[]"]')) === null || _a === void 0 ? void 0 : _a.value) || '';
            var degree = ((_b = entry.querySelector('input[name="degree[]"]')) === null || _b === void 0 ? void 0 : _b.value) || '';
            var year = ((_c = entry.querySelector('input[name="year[]"]')) === null || _c === void 0 ? void 0 : _c.value) || '';
            var div = document.createElement('div');
            div.innerHTML = "<h3>".concat(institution, "</h3><p>").concat(degree, " - ").concat(year, "</p>");
            previewEducation.appendChild(div);
        });
    }
    var experienceFields = document.querySelectorAll('#experienceFields .experience-entry');
    var previewExperience = document.getElementById('previewExperience');
    if (previewExperience) {
        previewExperience.innerHTML = ''; // Clear existing entries
        experienceFields.forEach(function (entry) {
            var _a, _b, _c, _d;
            var company = ((_a = entry.querySelector('input[name="company[]"]')) === null || _a === void 0 ? void 0 : _a.value) || '';
            var position = ((_b = entry.querySelector('input[name="position[]"]')) === null || _b === void 0 ? void 0 : _b.value) || '';
            var duration = ((_c = entry.querySelector('input[name="duration[]"]')) === null || _c === void 0 ? void 0 : _c.value) || '';
            var description = ((_d = entry.querySelector('textarea[name="description[]"]')) === null || _d === void 0 ? void 0 : _d.value) || '';
            var div = document.createElement('div');
            div.innerHTML = "<h3>".concat(company, "</h3><p>").concat(position, " (").concat(duration, ")</p><p>").concat(description, "</p>");
            previewExperience.appendChild(div);
        });
    }
    (_e = document.getElementById('resumePreview')) === null || _e === void 0 ? void 0 : _e.classList.remove('hidden');
}
// function for editablity
function saveEditedContent() {
    var _a, _b, _c;
    // Update form fields with edited preview content
    var name = ((_a = document.getElementById('previewName')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
    document.getElementById('name').value = name;
    var contactInfo = ((_b = document.getElementById('previewContact')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
    var _d = contactInfo.split('|').map(function (info) { return info.trim().split(': ')[1] || ''; }), email = _d[0], phone = _d[1];
    document.getElementById('email').value = email || '';
    document.getElementById('phone').value = phone || '';
    // Get edited skills
    var skillsList = ((_c = document.getElementById('previewSkills')) === null || _c === void 0 ? void 0 : _c.textContent) || '';
    document.getElementById('skills').value = skillsList;
    alert('Changes saved to the form!');
}
// for deleting
function deleteEntry(button, type) {
    var entryToRemove = button.closest(".".concat(type, "-entry"));
    var container = entryToRemove.parentElement;
    if (container.children.length > 1) {
        container.removeChild(entryToRemove);
    }
    else {
        alert("You must have at least one ".concat(type, " entry."));
    }
}
//for profile picture
(_c = document.getElementById('profilePicture')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', function (event) {
    var input = event.target;
    var previewContainer = document.getElementById('profilePicturePreview');
    if (input.files && input.files[0] && previewContainer) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            previewContainer.innerHTML = "<img src=\"".concat((_a = e.target) === null || _a === void 0 ? void 0 : _a.result, "\" alt=\"Profile Picture\">");
        };
        reader.readAsDataURL(input.files[0]);
    }
});
(_d = document.getElementById('getPDF')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    generatePDF();
});
function generatePDF() {
    return __awaiter(this, void 0, void 0, function () {
        var jsPDF, doc, resumePreview, canvas, imgData, imgWidth, imgHeight;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    jsPDF = (_a = window.jspdf) === null || _a === void 0 ? void 0 : _a.jsPDF;
                    if (!jsPDF) {
                        alert("jsPDF library is not loaded.");
                        return [2 /*return*/];
                    }
                    doc = new jsPDF();
                    resumePreview = document.getElementById('resumePreview');
                    if (!resumePreview) return [3 /*break*/, 2];
                    return [4 /*yield*/, window.html2canvas(resumePreview)];
                case 1:
                    canvas = _b.sent();
                    imgData = canvas.toDataURL('image/png');
                    imgWidth = 190;
                    imgHeight = (canvas.height * imgWidth) / canvas.width;
                    // Add image to PDF
                    doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                    doc.save('resume.pdf');
                    return [3 /*break*/, 3];
                case 2:
                    alert('Resume preview not available.');
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
