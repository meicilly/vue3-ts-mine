function  dataMenusHandler(data:any) {
    let arr:any = []
    data.forEach((item:any) => {
        if(item.type === '1'){
            arr.push(item)
            //console.log(item)
        }
        arr.forEach((children:any) => {
            if(children.id === item.parentId){
                children.children = []
                children.children.push(item)
            }
        })
    })
    return arr
}

export default dataMenusHandler