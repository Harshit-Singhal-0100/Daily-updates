function toggleUnit(unitId) {
    const subtopics = document.getElementById(unitId);
    if (subtopics.style.display === "block") {
        subtopics.style.display = "none";
    } else {
        subtopics.style.display = "block";
    }
}