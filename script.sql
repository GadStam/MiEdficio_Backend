USE [master]
GO
/****** Object:  Database [MiEdficio-database]    Script Date: 24/5/2022 09:59:48 ******/
CREATE DATABASE [MiEdficio-database]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MiEdficio-database', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\MiEdficio-database.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MiEdficio-database_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\MiEdficio-database_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MiEdficio-database] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MiEdficio-database].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MiEdficio-database] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MiEdficio-database] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MiEdficio-database] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MiEdficio-database] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MiEdficio-database] SET ARITHABORT OFF 
GO
ALTER DATABASE [MiEdficio-database] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MiEdficio-database] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MiEdficio-database] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MiEdficio-database] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MiEdficio-database] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MiEdficio-database] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MiEdficio-database] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MiEdficio-database] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MiEdficio-database] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MiEdficio-database] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MiEdficio-database] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MiEdficio-database] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MiEdficio-database] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MiEdficio-database] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MiEdficio-database] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MiEdficio-database] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MiEdficio-database] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MiEdficio-database] SET RECOVERY FULL 
GO
ALTER DATABASE [MiEdficio-database] SET  MULTI_USER 
GO
ALTER DATABASE [MiEdficio-database] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MiEdficio-database] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MiEdficio-database] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MiEdficio-database] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MiEdficio-database] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'MiEdficio-database', N'ON'
GO
ALTER DATABASE [MiEdficio-database] SET QUERY_STORE = OFF
GO
USE [MiEdficio-database]
GO
/****** Object:  User [alumno]    Script Date: 24/5/2022 09:59:49 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Administradores]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administradores](
	[Id_Administrador] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Mail] [varchar](50) NOT NULL,
	[Constraseña] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Administradorre] PRIMARY KEY CLUSTERED 
(
	[Id_Administrador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departamentos]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departamentos](
	[Id_Departamento] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](200) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Dni] [int] NOT NULL,
	[Telefono] [int] NOT NULL,
	[Departamento] [varchar](5) NOT NULL,
	[Id_Edificio] [int] NOT NULL,
 CONSTRAINT [PK_Departamentos] PRIMARY KEY CLUSTERED 
(
	[Id_Departamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Edificios]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Edificios](
	[Id_Edificio] [int] IDENTITY(1,1) NOT NULL,
	[Direccion] [varchar](50) NOT NULL,
	[Año_Construccion] [int] NOT NULL,
	[CUIT] [int] NOT NULL,
	[Clave_Suterh] [int] NOT NULL,
	[Id_Administrador] [int] NOT NULL,
	[Nro_Encargado] [int] NULL,
	[Nro_Emergencia] [int] NULL,
 CONSTRAINT [PK_Edificios] PRIMARY KEY CLUSTERED 
(
	[Id_Edificio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EdificioxEspacio]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EdificioxEspacio](
	[Id_Edificio] [int] NOT NULL,
	[Id_EspacioCC] [int] NOT NULL,
 CONSTRAINT [PK_EdificioxEspacio] PRIMARY KEY CLUSTERED 
(
	[Id_Edificio] ASC,
	[Id_EspacioCC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EspaciosComunes]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EspaciosComunes](
	[Id_EspacioCC] [int] IDENTITY(1,1) NOT NULL,
	[Tipo_espacio] [varchar](50) NOT NULL,
 CONSTRAINT [PK_EspaciosComunes] PRIMARY KEY CLUSTERED 
(
	[Id_EspacioCC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Eventos]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Eventos](
	[Id_Evento] [int] IDENTITY(1,1) NOT NULL,
	[Id_TipoEvento] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
	[Hora_Inicio] [varchar](50) NOT NULL,
	[Hora_final] [varchar](50) NOT NULL,
	[Cant_Invitados] [int] NULL,
	[Invitaredificio] [bit] NOT NULL,
	[Id_Departamento] [int] NULL,
	[Id_Edficio] [int] NULL,
	[Id_Espaciocomun] [int] NULL,
 CONSTRAINT [PK_Eventos] PRIMARY KEY CLUSTERED 
(
	[Id_Evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Expensas]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Expensas](
	[Id_Expensa] [int] IDENTITY(1,1) NOT NULL,
	[Id_Departamento] [int] NOT NULL,
	[Monto] [float] NOT NULL,
	[Fecha_Vencimiento] [date] NOT NULL,
	[Pdf_Expensa] [varchar](50) NOT NULL,
	[Mes] [int] NOT NULL,
	[Año] [int] NOT NULL,
 CONSTRAINT [PK_Expensas] PRIMARY KEY CLUSTERED 
(
	[Id_Expensa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inconvenientes]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inconvenientes](
	[Id_Incoveniente] [int] IDENTITY(1,1) NOT NULL,
	[Id_Departamento] [int] NOT NULL,
	[Id_TipoInconveniente] [int] NULL,
	[Descripcion] [varchar](200) NULL,
	[Fecha] [date] NOT NULL,
	[Fecha_Fin] [date] NULL,
 CONSTRAINT [PK_Inconvenientes] PRIMARY KEY CLUSTERED 
(
	[Id_Incoveniente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoEventos]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoEventos](
	[Id_Tipoevento] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoEventos] PRIMARY KEY CLUSTERED 
(
	[Id_Tipoevento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoIncovenientes]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoIncovenientes](
	[Id_Tipoincoveniente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoIncovenientes] PRIMARY KEY CLUSTERED 
(
	[Id_Tipoincoveniente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Administradores] ON 

INSERT [dbo].[Administradores] ([Id_Administrador], [Nombre], [Apellido], [Mail], [Constraseña]) VALUES (1, N'Victor', N'Fiszer', N'VDF@gmail.com', N'Mison')
INSERT [dbo].[Administradores] ([Id_Administrador], [Nombre], [Apellido], [Mail], [Constraseña]) VALUES (2, N'Ezequiel', N'Binker', N'EZEBIN@gmail.com', N'MacIos')
INSERT [dbo].[Administradores] ([Id_Administrador], [Nombre], [Apellido], [Mail], [Constraseña]) VALUES (3, N'Leonardo', N'Krystal', N'KRYSTAL@gmail.com', N'Mousen''t')
INSERT [dbo].[Administradores] ([Id_Administrador], [Nombre], [Apellido], [Mail], [Constraseña]) VALUES (4, N'Damian ', N'Asman', N'Damian@gmail.com', N'Abran ventanas')
SET IDENTITY_INSERT [dbo].[Administradores] OFF
GO
SET IDENTITY_INSERT [dbo].[Departamentos] ON 

INSERT [dbo].[Departamentos] ([Id_Departamento], [Codigo], [Nombre], [Apellido], [Dni], [Telefono], [Departamento], [Id_Edificio]) VALUES (1, N'gryvbygrtyiwvyi', N'Santiago', N'Cascallar', 46028383, 155935455, N'1A', 1)
INSERT [dbo].[Departamentos] ([Id_Departamento], [Codigo], [Nombre], [Apellido], [Dni], [Telefono], [Departamento], [Id_Edificio]) VALUES (2, N'ugeueueugueere', N'Valentin', N'Ziqui', 45029393, 155555555, N'1B', 1)
INSERT [dbo].[Departamentos] ([Id_Departamento], [Codigo], [Nombre], [Apellido], [Dni], [Telefono], [Departamento], [Id_Edificio]) VALUES (3, N'wethuewhthuwe', N'Alan ', N'Garber', 35252255, 341143141, N'2A', 1)
INSERT [dbo].[Departamentos] ([Id_Departamento], [Codigo], [Nombre], [Apellido], [Dni], [Telefono], [Departamento], [Id_Edificio]) VALUES (4, N'szeszwerw', N'rodrigo', N'bueno', 12213, 21323231, N'1a', 2)
SET IDENTITY_INSERT [dbo].[Departamentos] OFF
GO
SET IDENTITY_INSERT [dbo].[Edificios] ON 

INSERT [dbo].[Edificios] ([Id_Edificio], [Direccion], [Año_Construccion], [CUIT], [Clave_Suterh], [Id_Administrador], [Nro_Encargado], [Nro_Emergencia]) VALUES (1, N'Yatay 240', 2004, 417089, 1049723, 1, 580391, 5890)
INSERT [dbo].[Edificios] ([Id_Edificio], [Direccion], [Año_Construccion], [CUIT], [Clave_Suterh], [Id_Administrador], [Nro_Encargado], [Nro_Emergencia]) VALUES (2, N'Loyola 71', 1994, 4943342, 32352352, 1, 547845, 35629)
INSERT [dbo].[Edificios] ([Id_Edificio], [Direccion], [Año_Construccion], [CUIT], [Clave_Suterh], [Id_Administrador], [Nro_Encargado], [Nro_Emergencia]) VALUES (3, N'Cabildo 21', 2000, 3432552, 52253235, 2, 394309, 423434)
INSERT [dbo].[Edificios] ([Id_Edificio], [Direccion], [Año_Construccion], [CUIT], [Clave_Suterh], [Id_Administrador], [Nro_Encargado], [Nro_Emergencia]) VALUES (4, N'Corrientes 12', 2010, 21444114, 412124124, 3, 142241, 24124214)
INSERT [dbo].[Edificios] ([Id_Edificio], [Direccion], [Año_Construccion], [CUIT], [Clave_Suterh], [Id_Administrador], [Nro_Encargado], [Nro_Emergencia]) VALUES (5, N'Rivadavia 900', 2021, 21441411, 414213141, 4, 12231123, 142124124)
INSERT [dbo].[Edificios] ([Id_Edificio], [Direccion], [Año_Construccion], [CUIT], [Clave_Suterh], [Id_Administrador], [Nro_Encargado], [Nro_Emergencia]) VALUES (6, N'Yatay 241', 2003, 123132, 231213, 1, 12323121, 333333)
SET IDENTITY_INSERT [dbo].[Edificios] OFF
GO
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (1, 1)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (1, 2)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (1, 3)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (1, 4)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (1, 5)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (1, 6)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (2, 1)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (2, 2)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (2, 3)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (3, 1)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (4, 1)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (5, 1)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (5, 2)
INSERT [dbo].[EdificioxEspacio] ([Id_Edificio], [Id_EspacioCC]) VALUES (5, 3)
GO
SET IDENTITY_INSERT [dbo].[EspaciosComunes] ON 

INSERT [dbo].[EspaciosComunes] ([Id_EspacioCC], [Tipo_espacio]) VALUES (1, N'SUM')
INSERT [dbo].[EspaciosComunes] ([Id_EspacioCC], [Tipo_espacio]) VALUES (2, N'Hall')
INSERT [dbo].[EspaciosComunes] ([Id_EspacioCC], [Tipo_espacio]) VALUES (3, N'Gimnasio')
INSERT [dbo].[EspaciosComunes] ([Id_EspacioCC], [Tipo_espacio]) VALUES (4, N'Terraza')
INSERT [dbo].[EspaciosComunes] ([Id_EspacioCC], [Tipo_espacio]) VALUES (5, N'Estacionamiento')
INSERT [dbo].[EspaciosComunes] ([Id_EspacioCC], [Tipo_espacio]) VALUES (6, N'Pileta')
SET IDENTITY_INSERT [dbo].[EspaciosComunes] OFF
GO
SET IDENTITY_INSERT [dbo].[Eventos] ON 

INSERT [dbo].[Eventos] ([Id_Evento], [Id_TipoEvento], [Fecha], [Hora_Inicio], [Hora_final], [Cant_Invitados], [Invitaredificio], [Id_Departamento], [Id_Edficio], [Id_Espaciocomun]) VALUES (1, 1, CAST(N'2022-12-12' AS Date), N'10:20', N'10:30', 1, 0, 1, NULL, NULL)
INSERT [dbo].[Eventos] ([Id_Evento], [Id_TipoEvento], [Fecha], [Hora_Inicio], [Hora_final], [Cant_Invitados], [Invitaredificio], [Id_Departamento], [Id_Edficio], [Id_Espaciocomun]) VALUES (2, 1, CAST(N'2022-12-12' AS Date), N'10:20', N'10:40', NULL, 1, NULL, 1, 1)
INSERT [dbo].[Eventos] ([Id_Evento], [Id_TipoEvento], [Fecha], [Hora_Inicio], [Hora_final], [Cant_Invitados], [Invitaredificio], [Id_Departamento], [Id_Edficio], [Id_Espaciocomun]) VALUES (3, 2, CAST(N'2022-12-12' AS Date), N'10:50', N'12:00', 10, 1, 4, 2, 2)
SET IDENTITY_INSERT [dbo].[Eventos] OFF
GO
SET IDENTITY_INSERT [dbo].[Expensas] ON 

INSERT [dbo].[Expensas] ([Id_Expensa], [Id_Departamento], [Monto], [Fecha_Vencimiento], [Pdf_Expensa], [Mes], [Año]) VALUES (1, 1, 100, CAST(N'2022-12-12' AS Date), N'uieruguerere', 12, 2022)
INSERT [dbo].[Expensas] ([Id_Expensa], [Id_Departamento], [Monto], [Fecha_Vencimiento], [Pdf_Expensa], [Mes], [Año]) VALUES (2, 1, 200, CAST(N'2023-01-01' AS Date), N'urhrreuhiuhug', 1, 2023)
INSERT [dbo].[Expensas] ([Id_Expensa], [Id_Departamento], [Monto], [Fecha_Vencimiento], [Pdf_Expensa], [Mes], [Año]) VALUES (3, 2, 100, CAST(N'2022-12-12' AS Date), N'iofhiwoiwgge', 12, 2022)
SET IDENTITY_INSERT [dbo].[Expensas] OFF
GO
SET IDENTITY_INSERT [dbo].[Inconvenientes] ON 

INSERT [dbo].[Inconvenientes] ([Id_Incoveniente], [Id_Departamento], [Id_TipoInconveniente], [Descripcion], [Fecha], [Fecha_Fin]) VALUES (1, 1, 1, N'', CAST(N'2022-12-12' AS Date), CAST(N'2022-12-13' AS Date))
INSERT [dbo].[Inconvenientes] ([Id_Incoveniente], [Id_Departamento], [Id_TipoInconveniente], [Descripcion], [Fecha], [Fecha_Fin]) VALUES (2, 1, 1, NULL, CAST(N'2022-12-14' AS Date), CAST(N'2022-12-15' AS Date))
INSERT [dbo].[Inconvenientes] ([Id_Incoveniente], [Id_Departamento], [Id_TipoInconveniente], [Descripcion], [Fecha], [Fecha_Fin]) VALUES (3, 2, 2, NULL, CAST(N'2022-12-15' AS Date), CAST(N'2022-12-20' AS Date))
INSERT [dbo].[Inconvenientes] ([Id_Incoveniente], [Id_Departamento], [Id_TipoInconveniente], [Descripcion], [Fecha], [Fecha_Fin]) VALUES (4, 4, 4, NULL, CAST(N'2022-12-30' AS Date), CAST(N'2023-01-01' AS Date))
INSERT [dbo].[Inconvenientes] ([Id_Incoveniente], [Id_Departamento], [Id_TipoInconveniente], [Descripcion], [Fecha], [Fecha_Fin]) VALUES (5, 3, 1, NULL, CAST(N'2023-01-02' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[Inconvenientes] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoEventos] ON 

INSERT [dbo].[TipoEventos] ([Id_Tipoevento], [Nombre]) VALUES (1, N'Asamblea')
INSERT [dbo].[TipoEventos] ([Id_Tipoevento], [Nombre]) VALUES (2, N'Reserva')
INSERT [dbo].[TipoEventos] ([Id_Tipoevento], [Nombre]) VALUES (3, N'Fumigacion')
SET IDENTITY_INSERT [dbo].[TipoEventos] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoIncovenientes] ON 

INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (1, N'Corte de luz')
INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (2, N'Corte de agua')
INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (3, N'Ascensor fuera de servicio')
INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (4, N'Inundación')
INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (5, N'Fuga de gas')
INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (6, N'No hay portero')
INSERT [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente], [Nombre]) VALUES (7, N'Ruido molesto')
SET IDENTITY_INSERT [dbo].[TipoIncovenientes] OFF
GO
ALTER TABLE [dbo].[Departamentos]  WITH CHECK ADD  CONSTRAINT [FK_Departamentos_Edificios] FOREIGN KEY([Id_Edificio])
REFERENCES [dbo].[Edificios] ([Id_Edificio])
GO
ALTER TABLE [dbo].[Departamentos] CHECK CONSTRAINT [FK_Departamentos_Edificios]
GO
ALTER TABLE [dbo].[Edificios]  WITH CHECK ADD  CONSTRAINT [FK_Edificios_Administradores] FOREIGN KEY([Id_Administrador])
REFERENCES [dbo].[Administradores] ([Id_Administrador])
GO
ALTER TABLE [dbo].[Edificios] CHECK CONSTRAINT [FK_Edificios_Administradores]
GO
ALTER TABLE [dbo].[EdificioxEspacio]  WITH CHECK ADD  CONSTRAINT [FK_EdificioxEspacio_Edificios] FOREIGN KEY([Id_Edificio])
REFERENCES [dbo].[Edificios] ([Id_Edificio])
GO
ALTER TABLE [dbo].[EdificioxEspacio] CHECK CONSTRAINT [FK_EdificioxEspacio_Edificios]
GO
ALTER TABLE [dbo].[EdificioxEspacio]  WITH CHECK ADD  CONSTRAINT [FK_EdificioxEspacio_EspaciosComunes] FOREIGN KEY([Id_EspacioCC])
REFERENCES [dbo].[EspaciosComunes] ([Id_EspacioCC])
GO
ALTER TABLE [dbo].[EdificioxEspacio] CHECK CONSTRAINT [FK_EdificioxEspacio_EspaciosComunes]
GO
ALTER TABLE [dbo].[Eventos]  WITH CHECK ADD  CONSTRAINT [FK_Eventos_Departamentos] FOREIGN KEY([Id_Departamento])
REFERENCES [dbo].[Departamentos] ([Id_Departamento])
GO
ALTER TABLE [dbo].[Eventos] CHECK CONSTRAINT [FK_Eventos_Departamentos]
GO
ALTER TABLE [dbo].[Eventos]  WITH CHECK ADD  CONSTRAINT [FK_Eventos_Edificios] FOREIGN KEY([Id_Edficio])
REFERENCES [dbo].[Edificios] ([Id_Edificio])
GO
ALTER TABLE [dbo].[Eventos] CHECK CONSTRAINT [FK_Eventos_Edificios]
GO
ALTER TABLE [dbo].[Eventos]  WITH CHECK ADD  CONSTRAINT [FK_Eventos_TipoEventos] FOREIGN KEY([Id_TipoEvento])
REFERENCES [dbo].[TipoEventos] ([Id_Tipoevento])
GO
ALTER TABLE [dbo].[Eventos] CHECK CONSTRAINT [FK_Eventos_TipoEventos]
GO
ALTER TABLE [dbo].[Expensas]  WITH CHECK ADD  CONSTRAINT [FK_Expensas_Departamentos] FOREIGN KEY([Id_Departamento])
REFERENCES [dbo].[Departamentos] ([Id_Departamento])
GO
ALTER TABLE [dbo].[Expensas] CHECK CONSTRAINT [FK_Expensas_Departamentos]
GO
ALTER TABLE [dbo].[Inconvenientes]  WITH CHECK ADD  CONSTRAINT [FK_Inconvenientes_Departamentos] FOREIGN KEY([Id_Departamento])
REFERENCES [dbo].[Departamentos] ([Id_Departamento])
GO
ALTER TABLE [dbo].[Inconvenientes] CHECK CONSTRAINT [FK_Inconvenientes_Departamentos]
GO
ALTER TABLE [dbo].[Inconvenientes]  WITH CHECK ADD  CONSTRAINT [FK_Inconvenientes_TipoIncovenientes] FOREIGN KEY([Id_TipoInconveniente])
REFERENCES [dbo].[TipoIncovenientes] ([Id_Tipoincoveniente])
GO
ALTER TABLE [dbo].[Inconvenientes] CHECK CONSTRAINT [FK_Inconvenientes_TipoIncovenientes]
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateAdministrador]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateAdministrador]
@nombre varchar(50),
@apellido varchar(50),
@mail varchar(50),
@contraseña varchar(50)

as
begin

INSERT INTO Administradores(Nombre,Apellido,Mail,Constraseña)Values(@nombre,@apellido,@mail,@contraseña)
end
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateDepartamento]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateDepartamento]
@codigo varchar(200),
@nombre varchar(50),
@apellido varchar(50),
@dni int,
@telefono int,
@departamento varchar(5),
@id_edficio int
as
begin
insert into Departamentos (Codigo,nombre,Apellido,Dni,Telefono,Departamento,Id_Edificio)values(@codigo,@nombre,@apellido,@dni,@telefono,@departamento,@id_edficio)
end
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateEdificio]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateEdificio]
@direccion varchar(50),
@año_construccion int,
@cuit int,
@clave_suterh int,
@id_administrador int,
@nro_encargado int,
@nro_emergencia int
as
begin
insert into Edificios (direccion,Año_Construccion,CUIT,Clave_Suterh,Id_Administrador,Nro_Encargado,Nro_Emergencia)values(@direccion,@año_construccion,@cuit,@clave_suterh,@id_administrador,@nro_encargado,@nro_emergencia) 
end
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateExpensa]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CreateExpensa]
@id_departamento int,
@monto int,
@fecha_vencimiento date,
@pdf_expensas varchar(50),
@mes int,
@año int
as
begin

insert into Expensas(Id_Departamento,Monto,Fecha_Vencimiento,Pdf_Expensa,Mes,Año)Values(@id_departamento,@monto,@fecha_vencimiento,@pdf_expensas,@mes,@año)
end
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteAdministrador]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteAdministrador]
@id int,
@id_nuevoadministrador int,
@id_edifico int
as
begin
Update Edificios set Id_Administrador=@id_nuevoadministrador WHERE Id_Administrador=@id and Id_Edificio=@id_edifico
end
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteExpensa]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_DeleteExpensa]
@id int
as
begin

delete from Expensas where Id_Expensa=@id
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectAllAdministrador]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectAllAdministrador]

as
begin

Select * from Administradores
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectAllDepartamento]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectAllDepartamento]
as
begin
Select * from Departamentos
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectAllEdificios]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectAllEdificios]
as
begin
Select * from Edificios
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectAllExpensa]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_SelectAllExpensa]
as
begin

select * from Expensas 
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectByAdminEdificio]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectByAdminEdificio]
@id_administrador int
as
begin
Select * from Edificios where @id_administrador=Id_Administrador
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectByIdAdministrador]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectByIdAdministrador]
@id int
as
begin

Select * from Administradores where Id_Administrador=@id
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectByIdDepartamento]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectByIdDepartamento]
@id int
as
begin
select * from Departamentos where @id=Id_Departamento
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectByIdEdificio]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SelectByIdEdificio]
@id int
as
begin
Select * from Edificios where @id=Id_Edificio
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectByIdExpensa]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_SelectByIdExpensa]
@id int
as
begin

select * from Expensas where Id_Expensa=@id
end
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateAdministrador]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateAdministrador]
@id int,
@nombre varchar(50),
@apellido varchar(50),
@mail varchar(50),
@contraseña varchar(50)

as
begin

UPDATE Administradores SET Nombre=@nombre,Apellido=@apellido,Mail=@mail,Constraseña=@contraseña where Id_Administrador=@id
end
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateDepartamento]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateDepartamento]
@id int,
@codigo varchar(200),
@nombre varchar(50),
@apellido varchar(50),
@dni int,
@telefono int,
@departamento varchar(5),
@id_edficio int
as
begin
update Departamentos set Codigo=@codigo,Nombre=@nombre,Apellido=@apellido,Dni=@dni,Telefono=@telefono,Departamento=@departamento,Id_Edificio=@id_edficio where Id_Departamento=@id
end
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateEdificio]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateEdificio]
@id int,
@direccion varchar(50),
@año_construccion int,
@cuit int,
@clave_suterh int,
@id_administrador int,
@nro_encargado int,
@nro_emergencia int
as
begin
update Edificios set direccion=@direccion,Año_Construccion = @año_construccion ,CUIT =@cuit ,Clave_Suterh = @clave_suterh,Id_Administrador=@id_administrador,Nro_Encargado=@nro_encargado,Nro_Emergencia=@nro_emergencia where Id_Edificio=@id 
end
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateExpensa]    Script Date: 24/5/2022 09:59:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_UpdateExpensa]
@id int,
@id_departamento int,
@monto int,
@fecha_vencimiento date,
@pdf_expensas varchar(50),
@mes int,
@año int
as
begin

update Expensas set Id_Departamento=@id_departamento, Monto = @monto ,Fecha_Vencimiento =@fecha_vencimiento ,Pdf_Expensa = @pdf_expensas ,Mes = @mes ,Año = @año where Id_Expensa=@id
end
GO
USE [master]
GO
ALTER DATABASE [MiEdficio-database] SET  READ_WRITE 
GO
