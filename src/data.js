export const getRandomGrade = () => {
  const grades = ['A' ,'A-', 'A+', 'B', 'B-', 'B+', 'C', 'C-', 'C+', 'D', 'D-', 'D+'];
  const random = Math.floor(Math.random() * grades.length);
  return grades[random]
}
export const getRandomProgress = () => Math.floor(Math.random() * 100);

export const schools = [
  { id: 1, name: "Contabilidad", description: "Escuela de Contabilidad, enfocada en la formación de profesionales en contabilidad y auditoría." },
  { id: 2, name: "Finanzas", description: "Escuela de Finanzas, dedicada al estudio y análisis de los mercados financieros y la gestión de inversiones." },
  { id: 3, name: "Inglés", description: "Escuela de Inglés, especializada en la enseñanza del idioma inglés a todos los niveles." },
  { id: 4, name: "Alemán", description: "Escuela de Alemán, ofrece cursos de lengua y cultura alemana para principiantes y avanzados." },
  { id: 5, name: "Programación", description: "Escuela de Programación, donde se enseñan las habilidades necesarias para el desarrollo de software y aplicaciones." },
  { id: 6, name: "Documentación Técnica", description: "Escuela de Documentación Técnica, centrada en la redacción y gestión de documentos técnicos y manuales." },
  { id: 7, name: "Marketing Digital", description: "Escuela de Marketing Digital, que ofrece formación en estrategias y herramientas de marketing en línea." },
  { id: 8, name: "Diseño Gráfico", description: "Escuela de Diseño Gráfico, dedicada a la enseñanza de principios y técnicas de diseño visual." },
  { id: 9, name: "Recursos Humanos", description: "Escuela de Recursos Humanos, enfocada en la gestión del capital humano y desarrollo organizacional." },
  { id: 10, name: "Ingeniería de Software", description: "Escuela de Ingeniería de Software, donde se enseña el ciclo de vida del desarrollo de software." }
];

export const courses = [
  { id: 1, name: "Introducción a la Contabilidad", description: "Conceptos básicos de contabilidad.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 2, name: "Contabilidad Financiera", description: "Análisis y registro de transacciones financieras.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 3, name: "Auditoría", description: "Proceso de revisión y evaluación de registros financieros.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 4, name: "Contabilidad de Costos", description: "Métodos para determinar el costo de productos y servicios.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 5, name: "Contabilidad Gerencial", description: "Uso de información contable para la toma de decisiones.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 6, name: "Normas Internacionales de Contabilidad", description: "Estudio de las normas contables internacionales.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 7, name: "Contabilidad Gubernamental", description: "Contabilidad aplicada al sector público.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 8, name: "Impuestos", description: "Conceptos y cálculos relacionados con impuestos.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 9, name: "Contabilidad para PYMES", description: "Contabilidad aplicada a pequeñas y medianas empresas.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 10, name: "Contabilidad Avanzada", description: "Estudio de temas complejos en contabilidad.", schoolId: 1, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 11, name: "Fundamentos de Finanzas", description: "Introducción a los principios de finanzas.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 12, name: "Mercados Financieros", description: "Estudio del funcionamiento de los mercados de capitales.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 13, name: "Gestión de Inversiones", description: "Técnicas y estrategias para la gestión de carteras de inversión.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 14, name: "Análisis Financiero", description: "Evaluación de la situación financiera de las empresas.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 15, name: "Finanzas Corporativas", description: "Decisiones financieras en las empresas.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 16, name: "Derivados Financieros", description: "Estudio de productos financieros derivados.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 17, name: "Gestión de Riesgos", description: "Identificación y gestión de riesgos financieros.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 18, name: "Finanzas Internacionales", description: "Finanzas en un contexto global.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 19, name: "Econometría Financiera", description: "Aplicación de técnicas econométricas en finanzas.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 20, name: "Modelos Financieros", description: "Construcción de modelos para la toma de decisiones financieras.", schoolId: 2, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 21, name: "Inglés Básico", description: "Fundamentos del idioma inglés para principiantes.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 22, name: "Inglés Intermedio", description: "Desarrollo de habilidades intermedias en inglés.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 23, name: "Inglés Avanzado", description: "Perfeccionamiento del inglés para hablantes avanzados.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 24, name: "Inglés Conversacional", description: "Práctica de habilidades conversacionales en inglés.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 25, name: "Inglés de Negocios", description: "Inglés aplicado al mundo de los negocios.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 26, name: "Gramática Inglesa", description: "Estudio de las reglas gramaticales del inglés.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 27, name: "Vocabulario Inglés", description: "Ampliación del vocabulario en inglés.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 28, name: "Redacción en Inglés", description: "Técnicas de escritura en inglés.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 29, name: "Inglés para Viajeros", description: "Inglés práctico para viajeros.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 30, name: "Preparación para el TOEFL", description: "Preparación para el examen TOEFL.", schoolId: 3, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 31, name: "Alemán Básico", description: "Fundamentos del idioma alemán para principiantes.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 32, name: "Alemán Intermedio", description: "Desarrollo de habilidades intermedias en alemán.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 33, name: "Alemán Avanzado", description: "Perfeccionamiento del alemán para hablantes avanzados.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 34, name: "Alemán Conversacional", description: "Práctica de habilidades conversacionales en alemán.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 35, name: "Alemán para Negocios", description: "Alemán aplicado al mundo de los negocios.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 36, name: "Gramática Alemana", description: "Estudio de las reglas gramaticales del alemán.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 37, name: "Vocabulario Alemán", description: "Ampliación del vocabulario en alemán.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 38, name: "Redacción en Alemán", description: "Técnicas de escritura en alemán.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 39, name: "Alemán para Viajeros", description: "Alemán práctico para viajeros.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 40, name: "Preparación para el Goethe-Zertifikat", description: "Preparación para el examen Goethe-Zertifikat.", schoolId: 4, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 41, name: "Introducción a la Programación", description: "Conceptos básicos de programación.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 42, name: "Programación en Python", description: "Desarrollo de habilidades en programación con Python.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 43, name: "Desarrollo Web", description: "Creación de aplicaciones web dinámicas.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 44, name: "Programación en JavaScript", description: "Técnicas avanzadas de programación en JavaScript.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 45, name: "Bases de Datos", description: "Diseño y gestión de bases de datos.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 46, name: "Desarrollo de Aplicaciones Móviles", description: "Creación de aplicaciones para dispositivos móviles.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 47, name: "Programación Orientada a Objetos", description: "Conceptos de POO en diferentes lenguajes.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 48, name: "Estructuras de Datos", description: "Manejo de estructuras de datos en programación.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 49, name: "Algoritmos", description: "Diseño y análisis de algoritmos.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 50, name: "Desarrollo de APIs", description: "Creación y consumo de APIs.", schoolId: 5, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 51, name: "Introducción a la Documentación Técnica", description: "Fundamentos de la documentación técnica.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 52, name: "Redacción Técnica", description: "Técnicas de escritura para documentos técnicos.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 53, name: "Gestión de Documentos", description: "Organización y control de la documentación técnica.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 54, name: "Manual de Usuario", description: "Creación de manuales de usuario efectivos.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 55, name: "Documentación de Software", description: "Escribir documentación técnica para proyectos de software.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 56, name: "Normas y Estándares Técnicos", description: "Estudio de las normas aplicables a la documentación técnica.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 57, name: "Herramientas de Documentación", description: "Uso de herramientas y software para documentar.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 58, name: "Documentación para Desarrollo Ágil", description: "Documentación en entornos de desarrollo ágil.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 59, name: "Guías de Estilo", description: "Creación de guías de estilo para documentación técnica.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 60, name: "Documentación para la Seguridad", description: "Creación de documentación en proyectos de seguridad.", schoolId: 6, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 61, name: "Fundamentos de Marketing Digital", description: "Introducción al marketing digital.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 62, name: "SEO", description: "Optimización de motores de búsqueda.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 63, name: "Publicidad en Redes Sociales", description: "Creación de campañas publicitarias en redes sociales.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 64, name: "Email Marketing", description: "Estrategias y herramientas para el email marketing.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 65, name: "Analítica Web", description: "Medición y análisis del rendimiento en línea.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 66, name: "Publicidad de Pago por Clic (PPC)", description: "Gestión de campañas PPC.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 67, name: "Marketing de Contenidos", description: "Creación y distribución de contenido valioso.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 68, name: "Marketing en Video", description: "Uso del video como herramienta de marketing.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 69, name: "Estrategias de Marketing en Línea", description: "Desarrollo de estrategias de marketing digital.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 70, name: "Branding Digital", description: "Construcción y gestión de una marca en línea.", schoolId: 7, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 71, name: "Fundamentos de Diseño Gráfico", description: "Principios básicos del diseño gráfico.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 72, name: "Diseño de Logotipos", description: "Creación de logotipos efectivos.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 73, name: "Diseño de Publicaciones", description: "Diseño de libros, revistas y otros medios impresos.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 74, name: "Diseño de Interfaces", description: "Creación de interfaces de usuario intuitivas.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 75, name: "Diseño Web", description: "Principios y técnicas de diseño web.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 76, name: "Tipografía", description: "Estudio de la tipografía en el diseño gráfico.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 77, name: "Edición de Video", description: "Principios de edición de video para proyectos gráficos.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 78, name: "Animación Gráfica", description: "Creación de animaciones gráficas para multimedia.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 79, name: "Diseño de Carteles", description: "Creación de carteles visualmente impactantes.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 80, name: "Ilustración Digital", description: "Técnicas de ilustración en medios digitales.", schoolId: 8, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 81, name: "Fundamentos de Recursos Humanos", description: "Principios básicos de la gestión de recursos humanos.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 82, name: "Reclutamiento y Selección", description: "Proceso de reclutamiento y selección de personal.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 83, name: "Desarrollo Organizacional", description: "Mejora continua y desarrollo de la organización.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 84, name: "Gestión del Desempeño", description: "Evaluación y mejora del desempeño de los empleados.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 85, name: "Capacitación y Desarrollo", description: "Desarrollo de programas de formación para empleados.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 86, name: "Compensación y Beneficios", description: "Gestión de las compensaciones y beneficios de los empleados.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 87, name: "Relaciones Laborales", description: "Gestión de las relaciones entre la empresa y los empleados.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 88, name: "Seguridad y Salud Ocupacional", description: "Gestión de la seguridad y salud en el trabajo.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 89, name: "Gestión del Cambio", description: "Técnicas para gestionar el cambio organizacional.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 90, name: "Liderazgo en Recursos Humanos", description: "Desarrollo de habilidades de liderazgo en el ámbito de RRHH.", schoolId: 9, progress : getRandomProgress(), grade : getRandomGrade() },

  { id: 91, name: "Fundamentos de Ingeniería de Software", description: "Principios básicos del desarrollo de software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 92, name: "Ciclo de Vida del Software", description: "Estudio de las etapas del ciclo de vida del software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 93, name: "Desarrollo Ágil", description: "Metodologías ágiles para el desarrollo de software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 94, name: "Ingeniería de Requisitos", description: "Proceso de identificación y gestión de requisitos.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 95, name: "Pruebas de Software", description: "Técnicas de prueba para asegurar la calidad del software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 96, name: "Arquitectura de Software", description: "Diseño de la arquitectura de aplicaciones y sistemas.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 97, name: "Gestión de Proyectos de Software", description: "Gestión de proyectos en el desarrollo de software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 98, name: "Modelado de Software", description: "Técnicas de modelado para el desarrollo de software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 99, name: "DevOps", description: "Integración y entrega continua en el desarrollo de software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() },
  { id: 100, name: "Calidad del Software", description: "Aseguramiento de la calidad en el desarrollo de software.", schoolId: 10, progress : getRandomProgress(), grade : getRandomGrade() }
];

export const getRamdonSchools = (limit = 3) => {
  let count = 0;
  const schools_ = [];
  while(count < limit) {
    const random = Math.floor(Math.random() * 10);
    if(!schools_?.find(t => t.id == random)) {
      schools_.push(schools[random]);
      count++;
    }
  }

  return schools_;
}

export const getRamdonCourses = (schoolIds = [], limit = 3) => {
  const courses_ = [];
  for (const schoolId of schoolIds) {
    let count = 0;
    while(count < limit) {
      const filtredCourses = courses?.filter(t => t.schoolId == schoolId);
      const random = Math.floor(Math.random() * filtredCourses?.length);
      if(!courses_?.find(t => t?.id == random)) {
        courses_.push(filtredCourses[random])
        count++;
      }
    }
  }

  return courses_;
}
