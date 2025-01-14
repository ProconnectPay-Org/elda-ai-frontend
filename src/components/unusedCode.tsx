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
