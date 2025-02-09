// NODE_OPTIONS="--max-old-space-size=4096" npm run build
// 234Tree1333
// acs@proconnectpay.com
{

  /* {filteredJobExperiences.map(
        (experience: JobExperience, index: number) => (
          <div
            key={index}
            className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl"
          >
            <div className="flex justify-between">
              <h3 className="font-bold mb-4 text-lg">
                Job History: {experience.business_name}
              </h3>
              <p className="capitalize text-sm font-semibold">{jobStatus}</p>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col w-full">
                  <label htmlFor="nameOfCompany" className="text-[#344054]">
                    Name of Company
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    // id="nameOfCompany"
                    id={`nameOfCompany-${index}`}
                    {...register(`jobExperiences.${index}.nameOfCompany`)}
                    placeholder="Enter your first name"
                  />
                  {errors.nameOfCompany && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.nameOfCompany)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`jobTitle-${index}`}
                    className="text-[#344054]"
                  >
                    Job Title
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id={`jobTitle-${index}`}
                    {...register(`jobExperiences.${index}.jobTitle`)}
                    placeholder="Enter your job title"
                  />
                  {errors.jobTitle && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.jobTitle)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:w-1/2">
                  <label htmlFor={`mode-${index}`} className="text-[#344054]">
                    Mode
                  </label>
                  <input
                    className="border capitalize border-gray-border rounded-md py-2 px-4"
                    id={`mode-${index}`}
                    disabled
                    {...register(`jobExperiences.${index}.mode`)}
                    placeholder="Hybrid"
                  />
                  {errors.mode && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.mode)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor={`jobDescription-${index}`}
                    className="text-[#344054]"
                  >
                    Job Description
                  </label>
                  <textarea
                    className="border border-gray-border py-2 rounded-md px-4 min-h-20"
                    id={`jobDescription-${index}`}
                    {...register(`jobExperiences.${index}.jobDescription`)}
                    placeholder="Enter job description"
                  />
                  <div className="flex items-end w-full mt-4 flex-col md:flex-row justify-between gap-4 md:gap-8">
                    <div className="w-full md:w-fit hidden md:flex"></div>
                    <Button
                      onClick={(e) => handleRefine(e, index)}
                      disabled={refineLoading}
                      className="w-full text-[8px] md:w-fit bg-red flex gap-2 md:text-xs xl:text-sm"
                    >
                      <img src={promptWhiteImage} alt="prompt" />
                      {refineLoading
                        ? "Refining your prompt..."
                        : "Refine Job Summary"}
                    </Button>
                  </div>
                  {errors.jobDescription && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.jobDescription)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-evenly sm:justify-between gap-4 md:gap-8 w-full">
                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`location-${index}`}
                    className="text-[#344054]"
                  >
                    Location
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id={`location-${index}`}
                    {...register(`jobExperiences.${index}.location`)}
                    placeholder="Enter location"
                  />
                  {errors.location && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.location)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col w-1/3 sm:w-fit">
                  <label
                    htmlFor={`startDate-${index}`}
                    className="text-[#344054]"
                  >
                    Start Date
                  </label>
                  <input
                    disabled
                    type="text"
                    className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                    id={`startDate-${index}`}
                    {...register(`jobExperiences.${index}.startDate`)}
                  />
                  {errors.startDate && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.startDate)}
                    </span>
                  )}
                </div>
                {experience.year_ended !== "1960-01-01" && (
                  <div className="flex flex-col w-[10] sm:w-fit">
                    <label
                      htmlFor={`endDate-${index}`}
                      className="text-[#344054]"
                    >
                      End Date
                    </label>
                    <input
                      disabled
                      type="text"
                      className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                      id={`endDate-${index}`}
                      {...register(`jobExperiences.${index}.endDate`)}
                    />
                    {errors.endDate && (
                      <span className="text-red text-sm">
                        {getErrorMessage(errors.endDate)}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Button
                  className="bg-red"
                  onClick={(e) => handleDeleteChanges(e, index)}
                  disabled={loadingIndex === index}
                >
                  {loadingIndex === index ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
                <Button
                  className="bg-red"
                  onClick={(e) => handleSaveChanges(e, index)}
                  disabled={loadingIndex === index}
                >
                  {loadingIndex === index ? (
                    <div className="flex items-center justify-center gap-2">
                      <p>Saving</p>
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )
      )} */
}

{
  /* <div>
        {jobsCount >= 1 && <ReuseableJobs index={0} />}
        {jobsCount >= 2 && <ReuseableJobs index={1} />}
        {jobsCount === 3 && <ReuseableJobs index={2} />}
      </div> */
}

// useEffect(() => {
//   if (jobExperience) {
//     setValue(
//       `jobExperiences.${index}.workPlaceName`,
//       jobExperience.business_name || ""
//     );
//     setValue(
//       `jobExperiences.${index}.currentProfessionalStatus`,
//       jobExperience.professional_status || ""
//     );
//     setValue(
//       `jobExperiences.${index}.currentJobTitle`,
//       jobExperience.job_title || ""
//     );
//     setValue(
//       `jobExperiences.${index}.employmentType`,
//       jobExperience.employment_type || ""
//     );
//     setValue(
//       `jobExperiences.${index}.stateLocation`,
//       jobExperience.state || ""
//     );
//     setValue(
//       `jobExperiences.${index}.countryLocation`,
//       jobExperience.country || ""
//     );
//     setValue(
//       `jobExperiences.${index}.startedDate`,
//       jobExperience.year_started || ""
//     );
//     setValue(
//       `jobExperiences.${index}.endedDate`,
//       jobExperience.year_ended || ""
//     );
//     setValue(
//       `jobExperiences.${index}.jobStatus`,
//       jobExperience.job_status || ""
//     );
//     setValue(
//       `jobExperiences.${index}.companyDescription`,
//       jobExperience.company_description || ""
//     );
//     setValue(
//       `jobExperiences.${index}.jobSummary`,
//       jobExperience.job_summary || ""
//     );
//   }
// }, [jobExperience, setValue, index]);

// const generateSopFile = async (sopText: string, candidateId: string) => {
//   const sopContainer = document.createElement("div");

//   sopContainer.style.position = "absolute";
//   sopContainer.style.visibility = "hidden";
//   sopContainer.innerHTML = `
//     <h1 class="text-red font-bold text-center mb-4 text-xl uppercase">Statement of Purpose</h1>
//     <p>${sopText}</p>
//   `;
//   document.body.appendChild(sopContainer);

//   const canvas = await html2canvas(sopContainer, { scale: 2, useCORS: true });
//   document.body.removeChild(sopContainer);

//   const imgData = canvas.toDataURL("image/jpeg");
//   const pdf = new jsPDF("p", "mm", "a4");
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

//   const blob = pdf.output("blob");
//   return new File([blob], `${candidateId}-sop.pdf`, {
//     type: "application/pdf",
//   });
// };

{
  /* INPUT FIELDS */
}
{
  /* <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="email">
                Email <span className="text-red">*</span>
              </label>
              <div className="flex border border-gray-border w-full justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Mail} alt="mail icon" />
                <input
                  className="border-none w-full lowercase focus:outline-none"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              {emailError && <p className="text-red text-sm">{emailError}</p>}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="password">
                Password <span className="text-red">*</span>
              </label>
              <div className="flex border border-gray-border w-full justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="password"
                  placeholder="Enter a password for candidate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red text-sm">{passwordError}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="fullName">Full Name</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="fullName"
                  placeholder="Enter candidate's full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              {fullnameError && (
                <p className="text-red text-sm">{fullnameError}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="programType1">Program Type (1)</label>
              <div className="relative">
                <select
                  name="programType1"
                  id="programType1"
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  onChange={(e) => setProgramType1(e.target.value)}
                  value={programType1}
                >
                  <option value="">--Select a program--</option>
                  {programTypes.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
                {svgSpan}
              </div>
              {programType1Error && (
                <p className="text-red text-sm">{programType1Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedSchool1">Assign School (1)</label>
              <div className="relative">
                <select
                  name="assignedSchool1"
                  id="assignedSchool1"
                  value={assignedSchool1}
                  onChange={(e) => setAssignedSchool1(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="">--Select a school--</option>
                  {sortedSchools.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {svgSpan}
              </div>
              {assignedSchool1Error && (
                <p className="text-red text-sm">{assignedSchool1Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedCourse1">Assign a Course (1)</label>
              <div className="relative">
                <input
                  name="assignedCourse1"
                  id="assignedCourse1"
                  placeholder="Fill in a course"
                  value={assignedCourse1}
                  onChange={(e) => setAssignedCourse1(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                />
              </div>
              {assignedCourse1Error && (
                <p className="text-red text-sm">{assignedCourse1Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="programType2">Program Type (2)</label>
              <div className="relative">
                <select
                  name="programType2"
                  id="programType2"
                  value={programType2}
                  onChange={(e) => setProgramType2(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="">--Select a program--</option>
                  <option value="MSC">MSC</option>
                  <option value="MBA">MBA</option>
                </select>
                {svgSpan}
              </div>
              {programType2Error && (
                <p className="text-red text-sm">{programType2Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedSchool2">Assign School (2)</label>
              <div className="relative">
                <select
                  name="assignedSchool2"
                  id="assignedSchool2"
                  value={assignedSchool2}
                  onChange={(e) => setAssignedSchool2(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="">--Select a school--</option>
                  {sortedSchools.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {svgSpan}
              </div>
              {assignedSchool2Error && (
                <p className="text-red text-sm">{assignedSchool2Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedCourse2">Assign a Course (2)</label>
              <div className="relative">
                <input
                  name="assignedCourse2"
                  id="assignedCourse2"
                  placeholder="Fill in a course"
                  value={assignedCourse2}
                  onChange={(e) => setAssignedCourse2(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                />
              </div>
              {assignedCourse2Error && (
                <p className="text-red text-sm">{assignedCourse2Error}</p>
              )}
            </div>
          </div> */
}

{
  /* <Button
            className="w-full mt-10 bg-red h-12 text-lg"
            onClick={createProfile}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create User ID"}
          </Button> */
}


// const currentJob = sortedJobExperiences.find(
//   (experience: JobExperience) => experience.job_status === "current"
// );
// const otherJobs = sortedJobExperiences.filter(
//   (experience: JobExperience) => experience !== currentJob
// );


  // useEffect(() => {
  //   if (formData) {
  //     const sortedJobExperiences = formData.job_experience
  //       .sort((a: JobExperience, b: JobExperience) => a.id - b.id)
  //       .slice(0, 3);

  //     // Save the top three job experience IDs to cookies
  //     sortedJobExperiences.forEach((job: JobExperience, index: number) => {
  //       Cookies.set(`work_experience_id${index + 1}`, String(job.id), {
  //         expires: 7,
  //       });
  //     });

  //     // Optional: Clear any extra job experience cookies
  //     for (let i = sortedJobExperiences.length + 1; i <= 3; i++) {
  //       Cookies.remove(`work_experience_id${i}`);
  //     }

  //     const workExperienceIdsFromCookies = [
  //       Cookies.get("work_experience_id1"),
  //       Cookies.get("work_experience_id2"),
  //       Cookies.get("work_experience_id3"),
  //     ].filter(Boolean);

  //     const retrievedIds =
  //       formData?.job_experience?.map((job: JobExperience) => job.id) || [];

  //     // Find matching IDs and sort them from lowest to highest
  //     const matchingSortedIds = retrievedIds
  //       .filter((id: string) =>
  //         workExperienceIdsFromCookies.includes(String(id))
  //       ) // Compare with cookies
  //       .sort((a: any, b: any) => a - b);

  //     // Process the sorted IDs for further use
  //     const jobExperiences = formData?.job_experience
  //       ?.filter((job: JobExperience) => matchingSortedIds.includes(job.id)) // Filter jobs matching sorted IDs
  //       .sort(
  //         (a: JobExperience, b: JobExperience) =>
  //           matchingSortedIds.indexOf(a.id) - matchingSortedIds.indexOf(b.id)
  //       );
  //     setMyJobs(jobExperiences);
  //   }
  // }, [formData, id]);
