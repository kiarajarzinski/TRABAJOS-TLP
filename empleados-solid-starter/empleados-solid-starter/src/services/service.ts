    //service se encarga de hacer tareas especificas  
    
    const bonus = baseSalary * 0.02 * yearsOfService;
    const finalSalary = baseSalary + bonus;

    const employee = await Employee.create({
      name,
      position,
      baseSalary,
      yearsOfService,
      finalSalary
    });