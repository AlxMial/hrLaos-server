
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

CREATE TABLE [dbo].[tbOrg](
	[OrgID] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[OrgCode] [dbo].[VeryShortString] NULL,
	[OrgName] [dbo].[MediumString] NOT NULL,
	[OrgNameEng] [dbo].[MediumString] NULL,
	[OrgType] [dbo].[VeryShortString] NOT NULL,
	[BusinessType] [dbo].[IDIncrement] NULL,
	[BeginProgram] [datetime] NULL,
	[Image] [dbo].[ImageFile] NULL,
	[TaxNo] [dbo].[VeryShortString] NULL,
	[TaxBranchNo] [dbo].[VeryShortString] NULL,
	[IsFiscalYear] [dbo].[YesNo] NOT NULL,
	[IsCalLeaveFiscalYear] [dbo].[YesNo] NOT NULL,
	[DateStartYear] [dbo].[VeryShortString] NULL,
	[MonthStartYear] [dbo].[IDIncrement] NULL,
	[YearCount] [dbo].[IDIncrement] NULL,
	[HourPerDay] [dbo].[VeryShortString] NULL,
	[DayPerMonth] [dbo].[VeryShortString] NULL,
	[CompanyID] [dbo].[IDIncrement] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbOrg] PRIMARY KEY CLUSTERED 
(
	[OrgID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[tbOrgAddress](
	[OrgAddressID] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[OrgID] [dbo].[IDIncrement] NOT NULL,
	[AddressDetail] [dbo].[LongString] NULL,
	[District] [dbo].[MediumString] NULL,
	[Amphur] [dbo].[MediumString] NULL,
	[Province] [dbo].[MediumString] NULL,
	[PostalCode] [dbo].[VeryShortString] NULL,
	[Country] [dbo].[MediumString] NULL,
	[Phone] [dbo].[ShortString] NULL,
	[Email] [dbo].[ShortString] NULL,
	[Fax] [dbo].[ShortString] NULL,
	[Website] [dbo].[MediumString] NULL,
	[Latitude] [dbo].[LongFloat] NULL,
	[Longitude] [dbo].[LongFloat] NULL,
	[CompanyID] [dbo].[IDIncrement] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbOrgAddress] PRIMARY KEY CLUSTERED 
(
	[OrgAddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[tbOrgAddress]  WITH CHECK ADD  CONSTRAINT [FK_tbOrgAddress_tbOrg] FOREIGN KEY([OrgID])
REFERENCES [dbo].[tbOrg] ([OrgID])
GO

ALTER TABLE [dbo].[tbOrgAddress] CHECK CONSTRAINT [FK_tbOrgAddress_tbOrg]
GO

CREATE TABLE [dbo].[tbEmployee](
	[EmpID] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[Image] [dbo].[ImageFile] NULL,
	[EmpCode] [dbo].[VeryShortString] NULL,
	[Title] [dbo].[IDIncrement] NULL,
	[FirstName] [dbo].[ShortString] NULL,
	[LastName] [dbo].[ShortString] NULL,
	[NickName] [dbo].[ShortString] NULL,
	[FirstNameEng] [dbo].[ShortString] NULL,
	[LastNameEng] [dbo].[ShortString] NULL,
	[NickNameEng] [dbo].[ShortString] NULL,
	[Gender] [dbo].[IDIncrement] NULL,
	[BirthDate] [datetime] NULL,
	[Religion] [dbo].[IDIncrement] NULL,
	[Nationality] [dbo].[IDIncrement] NULL,
	[IdentificationNo] [dbo].[VeryShortString] NULL,
	[IdentityExpire] [datetime] NULL,
	--[TaxID] [dbo].[VeryShortString] NULL,
	[PassportNo] [dbo].[VeryShortString] NULL,
	[PassportExpire] [datetime] NULL,
	[MaritalStatus] [dbo].[IDIncrement] NULL,
	[IsOver65] [dbo].[YesNo] NOT NULL,
	[MaritalDate] [datetime] NULL,
	[MilitaryStatus] [dbo].[IDIncrement] NULL,
	[ExemptReason] [dbo].[LongString] NULL,
	[OrgID] [dbo].[IDIncrement] NOT NULL,
	[CompanyID] [dbo].[IDIncrement] NOT NULL,
	[CreatedBy] [dbo].[IDIncrement] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [dbo].[IDIncrement] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsDeleted] [dbo].[YesNo] NOT NULL,
 CONSTRAINT [PK_tbEmployee] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tbEmployee]  WITH CHECK ADD  CONSTRAINT [FK_tbEmployee_tbOrg] FOREIGN KEY([OrgID])
REFERENCES [dbo].[tbOrg] ([OrgID])
GO

ALTER TABLE [dbo].[tbEmployee] CHECK CONSTRAINT [FK_tbEmployee_tbOrg]
GO

ALTER TABLE [dbo].[tbEmployee]  WITH CHECK ADD  CONSTRAINT [FK_tbEmployee_tbRegister] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[tbRegister] ([RegisterID])
GO

ALTER TABLE [dbo].[tbEmployee] CHECK CONSTRAINT [FK_tbEmployee_tbRegister]
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

ALTER TABLE [dbo].[tbUser]  WITH CHECK ADD  CONSTRAINT [FK_tbUser_tbEmployee] FOREIGN KEY([EmpID])
REFERENCES [dbo].[tbEmployee] ([EmpID])
GO

ALTER TABLE [dbo].[tbUser] CHECK CONSTRAINT [FK_tbUser_tbEmployee]
GO

ALTER TABLE [dbo].[tbUser]  WITH CHECK ADD  CONSTRAINT [FK_tbUser_tbRegister] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[tbRegister] ([RegisterID])
GO

ALTER TABLE [dbo].[tbUser] CHECK CONSTRAINT [FK_tbUser_tbRegister]
GO


CREATE TABLE [dbo].[tbEmpAddress](
	[EmpAddressID] [dbo].[IDIncrement] IDENTITY(1,1) NOT NULL,
	[EmpID] [dbo].[IDIncrement] NOT NULL,
	[AddressType] [dbo].[VeryShortString] NULL,
	[AddressDetail] [dbo].[LongString] NULL,
	[District] [dbo].[MediumString] NULL,
	[Amphur] [dbo].[MediumString] NULL,
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