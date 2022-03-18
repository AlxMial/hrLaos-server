
--/****** Create Data Type ******/

CREATE TYPE [dbo].[IDIncrement] FROM [BIGINT]  NULL

CREATE TYPE [dbo].[YesNo] FROM [BIT]  NULL
CREATE TYPE [dbo].[Password] FROM [NVARCHAR](1000)  NULL
CREATE TYPE [dbo].[ImageFile] FROM [IMAGE] NULL
CREATE TYPE [dbo].[File] FROM [VARBINARY](max) NULL

CREATE TYPE [dbo].[VeryShortString] FROM [VARCHAR](25) NULL
CREATE TYPE [dbo].[ShortString] FROM [VARCHAR](50) NULL
CREATE TYPE [dbo].[MediumString] FROM [NVARCHAR](100) NULL
CREATE TYPE [dbo].[LongString] FROM [NVARCHAR](255) NULL
CREATE TYPE [dbo].[Description] FROM [NVARCHAR](500) NULL

CREATE TYPE [dbo].[ShortNumber] FROM [TINYINT] NULL
CREATE TYPE [dbo].[Number] FROM [SMALLINT] NULL
CREATE TYPE [dbo].[LongNumber] FROM [INT] NULL

CREATE TYPE [dbo].[ShortFloat] FROM [DECIMAL](10, 4) NULL
CREATE TYPE [dbo].[MediumFloat] FROM [DECIMAL](16, 6) NULL
CREATE TYPE [dbo].[LongFloat] FROM [DECIMAL](28, 6) NULL
CREATE TYPE [dbo].[MoneyFloat] FROM [decimal](10, 2) NULL
CREATE TYPE [dbo].[Byte] FROM [VARBINARY](max) NULL

/****** Create Table ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tbRegister](
	[RegisterID] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[CompanyName] [dbo].[MediumString] NOT NULL,
	[TitleName] [dbo].[IDIncrement] NOT NULL,
	[FirstName] [dbo].[MediumString] NOT NULL,
	[LastName] [dbo].[MediumString] NOT NULL,
	[Phone] [dbo].[ShortString] NOT NULL,
	[Email] [dbo].[MediumString] NOT NULL,
	[Password] [dbo].[Password] NOT NULL,
	[IsActivate] [dbo].[YesNo] NOT NULL,
	[ActivateDate] [datetime] NULL,
	[RegisterDate] [datetime] NULL,
	[NumberOfEmp] [dbo].[ShortString] NULL,
 CONSTRAINT [PK_hrcRegister] PRIMARY KEY CLUSTERED 
(
	[RegisterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbCompany](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[companyCode] [dbo].[VeryShortString] NULL,
	[companyName] [dbo].[MediumString] NOT NULL,
	[companyNameEn] [dbo].[MediumString] NULL,
	[companyType] [dbo].[VeryShortString] NOT NULL,
	[businessType] [dbo].[IDIncrement] NULL,
	[programStartDate] [datetime] NULL,
	[Image] [dbo].[Byte] NULL,
	[taxNo] [dbo].[VeryShortString] NULL,
	[taxBranchNo] [dbo].[VeryShortString] NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbCompany] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbCompanyAddress](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[companyID] [dbo].[IDIncrement] NOT NULL,
	[addressDetail] [dbo].[LongString] NULL,
	[subDistrict] [dbo].[MediumString] NULL,
	[district] [dbo].[MediumString] NULL,
	[province] [dbo].[MediumString] NULL,
	[postalCode] [dbo].[VeryShortString] NULL,
	[country] [dbo].[MediumString] NULL,
	[phone] [dbo].[ShortString] NULL,
	[email] [dbo].[ShortString] NULL,
	[fax] [dbo].[ShortString] NULL,
	[website] [dbo].[MediumString] NULL,
	[latitude] [dbo].[LongFloat] NULL,
	[longitude] [dbo].[LongFloat] NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbCompanyAddress] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbCompanyWorkingDay](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[companyID] [dbo].[IDIncrement] NOT NULL,
	[startTime] [datetime] NULL,
	[endTime] [datetime] NULL,
	[hourPerDay] [dbo].[ShortNumber] NULL,
	[dayPerMonth] [dbo].[ShortNumber] NULL,
	[isMon] [dbo].[YesNo] NOT NULL,
	[isTue] [dbo].[YesNo] NOT NULL,
	[isWed] [dbo].[YesNo] NOT NULL,
	[isThu] [dbo].[YesNo] NOT NULL,
	[isFri] [dbo].[YesNo] NOT NULL,
	[isSat] [dbo].[YesNo] NOT NULL,
	[isSun] [dbo].[YesNo] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbCompanyWorkingDay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)

CREATE TABLE [dbo].[tbEmployee](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[image] [dbo].[Byte] NULL,
	[empCode] [dbo].[VeryShortString] NULL,
	[title] [dbo].[IDIncrement] NULL,
	[firstName] [dbo].[ShortString] NULL,
	[lastName] [dbo].[ShortString] NULL,
	[nickName] [dbo].[ShortString] NULL,
	[titleEn] [dbo].[IDIncrement] NULL,
	[firstNameEn] [dbo].[ShortString] NULL,
	[lastNameEn] [dbo].[ShortString] NULL,
	[nickNameEn] [dbo].[ShortString] NULL,
	[gender] [dbo].[IDIncrement] NULL,
	[birthDate] [datetime] NULL,
	[religion] [dbo].[IDIncrement] NULL,
	[nationality] [dbo].[IDIncrement] NULL,
	[identificationNo] [dbo].[VeryShortString] NULL,
	[identityExpire] [datetime] NULL,
	[passportNo] [dbo].[VeryShortString] NULL,
	[passportExpire] [datetime] NULL,
	[companyID] [dbo].[IDIncrement] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbEmployee] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tbEmployee]  WITH CHECK ADD  CONSTRAINT [FK_tbEmployee_tbCompany] FOREIGN KEY([companyID])
REFERENCES [dbo].[tbCompany] ([id])
GO

ALTER TABLE [dbo].[tbEmployee] CHECK CONSTRAINT [FK_tbEmployee_tbCompany]
GO

CREATE TABLE [dbo].[tbUser](
	[UserID] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[EmpID] [dbo].[IDIncrement] NOT NULL,
	[UserName] [dbo].[LongString] NOT NULL,
	[Email] [dbo].[LongString] NULL,
	[Password] [dbo].[Password] NOT NULL,
	[Role] [dbo].[VeryShortString] NOT NULL,
	[IsActivate] [dbo].[YesNo] NOT NULL,
	[CompanyID] [dbo].[IDIncrement] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_hrcUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[tbEmpAddress](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[EmpID] [dbo].[IDIncrement] NOT NULL,
	[AddressType] [dbo].[VeryShortString] NULL,
	[AddressDetail] [dbo].[LongString] NULL,
	[subDistrict] [dbo].[MediumString] NULL,
	[district] [dbo].[MediumString] NULL,
	[Province] [dbo].[MediumString] NULL,
	[PostalCode] [dbo].[VeryShortString] NULL,
	[Country] [dbo].[MediumString] NULL,
	[Phone] [dbo].[ShortString] NULL,
	[Email] [dbo].[ShortString] NULL,
	[Latitude] [dbo].[LongFloat] NULL,
	[Longitude] [dbo].[LongFloat] NULL,
	[CompanyID] [dbo].[IDIncrement] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbEmpAddress] PRIMARY KEY CLUSTERED 
(
	[EmpAddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[tbEmpAddress]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpAddress_tbEmployee] FOREIGN KEY([EmpID])
REFERENCES [dbo].[tbEmployee] ([EmpID])
GO

ALTER TABLE [dbo].[tbEmpAddress] CHECK CONSTRAINT [FK_tbEmpAddress_tbEmployee]
GO

ALTER TABLE tbCompany ADD CONSTRAINT FK_tbCompany_tbRegister
FOREIGN KEY (registerId) REFERENCES tbRegister(id);

ALTER TABLE tbCompanyAddress ADD CONSTRAINT FK_tbCompanyAddress_tbCompany
FOREIGN KEY (companyId) REFERENCES tbCompany(id);

ALTER TABLE tbCompanyWorkingDay ADD CONSTRAINT FK_tbCompanyWorkingDay_tbCompany
FOREIGN KEY (companyId) REFERENCES tbCompany(id);

ALTER TABLE tbCompanyWorkingDay ADD CONSTRAINT FK_tbCompanyWorkingDay_tbCompany
FOREIGN KEY (companyId) REFERENCES tbCompany(id);

ALTER TABLE tbEmployee ADD CONSTRAINT FK_tbEmployee_tbCompany
FOREIGN KEY (companyId) REFERENCES tbCompany(id);

ALTER TABLE tbUser ADD CONSTRAINT FK_tbUser_tbCompany
FOREIGN KEY (companyId) REFERENCES tbCompany(id);

ALTER TABLE tbUser ADD CONSTRAINT FK_tbUser_tbEmployee
FOREIGN KEY (empId) REFERENCES tbEmployee(id);

CREATE TABLE [dbo].[tbHolidayHD](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[year] [dbo].[VeryShortString] NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbHolidayHD] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbHolidayDT](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[holidayId] [dbo].[IDIncrement] NOT NULL,
	[date] [datetime] NOT NULL,
	[name] [dbo].[MediumString] NOT NULL,
	[nameEn] [dbo].[MediumString] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbHolidayDT] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbDepartment](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[departmentCode] [dbo].[VeryShortString] NULL,
	[departmentName] [dbo].[ShortString] NULL,
	[departmentNameEn] [dbo].[ShortString] NULL,
	[mainDepartmentId] [dbo].[IDIncrement] NULL,
	[description] [dbo].[Description] NULL,
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbDepartment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbPosition](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[positionCode] [dbo].[ShortString] NULL,
	[positionName] [dbo].[ShortString] NULL,
	[positionNameEn] [dbo].[ShortString] NULL,
	[mainPositionId] [dbo].[IDIncrement] NULL,
	[description] [dbo].[Description] NULL,
	[jobDescription] [dbo].[Description] NULL,
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbPosition] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[tbShift](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[shiftCode] [dbo].[VeryShortString] NOT NULL,
	[shiftName] [dbo].[ShortString] NOT NULL,	
	[shiftType] [dbo].[VeryShortString] NOT NULL,
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbShift] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbShiftDetail](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[shiftId] [dbo].[IDIncrement] NOT NULL,
	[timeStamp] [dbo].[Number] NULL,	
	[in1] [dbo].[LongNumber] NULL,
	[out1] [dbo].[LongNumber] NULL,
	[breakStart] [dbo].[LongNumber] NULL,
	[breakEnd] [dbo].[LongNumber] NULL,
	[in2] [dbo].[LongNumber] NULL,
	[out2] [dbo].[LongNumber] NULL,
	[breakHour] [dbo].[LongNumber] NULL,
	[workHour] [dbo].[Number] NULL,
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbShiftDetail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbSetTimeStamp](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[isAllowTimeStamp] [dbo].[YesNo] NOT NULL,
	[isAllowInside] [dbo].[YesNo] NOT NULL,
	[isOrg] [dbo].[YesNo] NOT NULL,
	[orgRadius] [dbo].[Number] NULL,	
	[isAllOrg] [dbo].[YesNo] NOT NULL, 	
	[allOrgRadius] [dbo].[Number] NULL,	
	[isAllowOutside] [dbo].[YesNo] NOT NULL, 	
	[isAnywhere] [dbo].[YesNo] NOT NULL, 	
	[isSetPlace] [dbo].[YesNo] NOT NULL,
	[isAllowCurrentAddress] [dbo].[YesNo] NOT NULL, 
	[isPhoto] [dbo].[YesNo] NOT NULL, 	 	
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbSetTimeStampDT](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[setTimeStampId] [dbo].[IDIncrement] NOT NULL,
	[placeName] [dbo].[LongString] NOT NULL,
	[latitude] [dbo].[LongNumber] NULL,
	[longtitude] [dbo].[LongNumber] NULL,
	[radius] [dbo].[Number] NULL,	
	[description] [dbo].[Description] NULL,
	[isActive] [dbo].[YesNo] NOT NULL,	
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbTime](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[empId]	[dbo].[IDIncrement] NOT NULL,
	[date] [datetime] NOT NULL,
	[dateType] [dbo].[ShortString] NOT NULL,	
	[status] [dbo].[ShortString] NOT NULL,	
	[shiftId]	[dbo].[IDIncrement] NOT NULL,
	[timeIn1]  [dbo].[LongNumber] NULL,
	[timeOut1] [dbo].[LongNumber] NULL,
	[timeIn2] [dbo].[LongNumber] NULL,
	[timeOut2]  [dbo].[LongNumber] NULL,
	[late1] [dbo].[Number] NULL,	
	[late2] [dbo].[Number] NULL,	
	[early1] [dbo].[Number] NULL,	
	[early2] [dbo].[Number] NULL,	
	[workHour] [dbo].[Number] NULL,	
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL) ON [PRIMARY]
GO


CREATE TABLE [dbo].[tbEmpEmployment](
	[id] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[empId]	[dbo].[IDIncrement] NOT NULL,
	[startWorkingDate] [datetime] NULL,
	[departmentId] [dbo].[IDIncrement]  ,
	[positionId] [dbo].[IDIncrement] ,
	[supervisorId] [dbo].[IDIncrement] ,
	[shiftId] [dbo].[IDIncrement] ,
	[IsAddressStamp] [dbo].[YesNo] NOT NULL,
	[companyId] [dbo].[IDIncrement] NOT NULL,
	[createdBy] [dbo].[IDIncrement] NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [dbo].[IDIncrement] NULL,
	[modifiedDate] [datetime] NULL,
	[isDeleted] [dbo].[YesNo] NOT NULL,
) ON [PRIMARY]
GO
