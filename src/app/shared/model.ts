interface ColumnDef {
  prop:string,
  displayName:string,
  width?:number
}

interface Todo {
  id:string,
  name:string,
  tag:string,
  priority:string,
  status:string,
  duedate:string
}

export {
  Todo,
  ColumnDef
}
