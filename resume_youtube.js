// Form repeater
$(document).ready(function () {
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV(); // Make sure generateCV() is called correctly after hiding elements
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});

// Regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};

// Function to fetch values from dynamic form elements
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

// Function to validate form data
function validateFormData(elem, elemType, elemName) {
    if (elemType === validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
    if (elemType === validType.TEXT_EMP) {
        if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
    if (elemType === validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
    if (elemType === validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
    if (elemType === validType.ANY) {
        if (elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
    if (elemType === validType.DIGIT) {
        if (!digitRegex.test(elem.value.trim())) {
            addErrMsg(elem, elemName);
        } else {
            removeErrMsg(elem);
        }
    }
}

// Function to add error message
function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// Function to remove error message
function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = '';
}

// Function to get user inputs
const getUserInputs = () => {
    let firstnameElem = mainForm.firstname,
        middlenameElem = mainForm.middlename,
        lastnameElem = mainForm.lastname,
        designationElem = mainForm.designation,
        DOBElem = mainForm.DOB,
        addressElem = mainForm.address,
        emailElem = mainForm.email,
        phonenoElem = mainForm.phoneno,
        objectiveElem = mainForm.objective,
        eduSchoolElem = document.querySelectorAll('.edu_school'),
        eduDegreeElem = document.querySelectorAll('.edu_degree'),
        eduUniversityElem = document.querySelectorAll('.edu_university'),
        eduCityElem = document.querySelectorAll('.edu_city'),
        eduStartDateElem = document.querySelectorAll('.edu_start_date'),
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
        eduPercentageElem = document.querySelectorAll('.edu_percentage'),
        eduCgpaElem = document.querySelectorAll('.edu_cgpa'),
        eduPassYearElem = document.querySelectorAll('.edu_pass_year'),
        achievementsTitleElem = document.querySelectorAll('.achieve_title'),
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description'),
        expTitleElem = document.querySelectorAll('.exp_title'),
        expOrganizationElem = document.querySelectorAll('.exp_organization'),
        expLocationElem = document.querySelectorAll('.exp_location'),
        expStartDateElem = document.querySelectorAll('.exp_start_date'),
        expEndDateElem = document.querySelectorAll('.exp_end_date'),
        expDescriptionElem = document.querySelectorAll('.exp_description'),
        projTitleElem = document.querySelectorAll('.proj_title'),
        projLinkElem = document.querySelectorAll('.proj_link'),
        projDescriptionElem = document.querySelectorAll('.proj_description'),
        skillElem = document.querySelectorAll('.skill'),
        websiteNameElems = mainForm.querySelectorAll('.website_name'),
        websiteLinkElems = mainForm.querySelectorAll('.website_link');
    

    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation/Current Degree'));
    DOBElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Date of Birth'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone No'));
    objectiveElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Objective'));

    websiteNameElems.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Website Name')));
    websiteLinkElems.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Website Link')));

    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Degree')));
    eduUniversityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'University')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    eduPercentageElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.DIGIT, 'Percentage')));
    eduCgpaElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.DIGIT, 'CGPA')));
    eduPassYearElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Pass Year')));

    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Skill')));

    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));

    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        DOB: DOBElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        objective: objectiveElem.value,
        websites: fetchValues(['website_name', 'website_link'], websiteNameElems, websiteLinkElems), // Make sure you pass correct arguments
        education: fetchValues(['edu_school', 'edu_degree', 'edu_university', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_percentage', 'edu_cgpa', 'edu_pass_year'], eduSchoolElem, eduDegreeElem, eduUniversityElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduPercentageElem, eduCgpaElem, eduPassYearElem),
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};

// Function to show list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = '';
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        for (const key in listItem) {
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);

            // Add a separator between website name and website link
            if (key === 'website_name' && listItem['website_link']) {
                let separator = document.createElement('span');
                separator.innerHTML = ' : ';
                itemElem.appendChild(separator);
            }
        }

        listContainer.appendChild(itemElem);
    });
};

// Function to display CV
const displayCV = (userData) => {
    const {
        firstname,
        middlename,
        lastname,
        designation,
        DOB,
        address,
        email,
        phoneno,
        objective,
        websites,
        projects,
        achievements,
        skills,
        education,
        experiences
    } = userData;

    document.getElementById('fullname_dsp').innerHTML = `${firstname} ${middlename} ${lastname}`;
    document.getElementById('designation_dsp').innerHTML = designation;
    document.getElementById('DOB_dsp').innerHTML = DOB;
    document.getElementById('address_dsp').innerHTML = address;
    document.getElementById('email_dsp').innerHTML = email;
    document.getElementById('phoneno_dsp').innerHTML = phoneno;
    document.getElementById('objective_dsp').innerHTML = objective;

    showListData(websites, document.getElementById('websites_dsp'));
    showListData(projects, document.getElementById('projects_dsp'));
    showListData(achievements, document.getElementById('achievements_dsp'));
    showListData(skills, document.getElementById('skills_dsp'));
    showListData(education, document.getElementById('education_dsp'));
    showListData(experiences, document.getElementById('experiences_dsp'));

    // Display image
    const imageElem = document.getElementById('image_dsp');
    const imageInput = document.getElementById('image');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageElem.src = e.target.result;
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        imageElem.src = ''; // Clear the image if no file is selected
    }
};

// Function to generate CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};

// Function to preview image
function previewImage() {
    let oFReader = new FileReader();
    let imageElem = document.getElementById('image');
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function (ofEvent) {
        document.getElementById('image_dsp').src = ofEvent.target.result;
    };
}

// Function to print CV
function printCV() {
    window.print();
}
