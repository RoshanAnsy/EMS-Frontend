
import RemoveAccess from "@/components/user/RemoveAccess";
interface PageProps{
  params:Promise<{ id: string }>;
}


 const page=async({params}: PageProps) =>{
    const { id } =await params;
  const idDecoded = decodeURIComponent(id);

  return (
    // <Card className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
    //   <CardHeader className="mb-6 text-center text-2xl font-bold">
    //     User Access Settings
    //   </CardHeader>
    //   <CardContent>
    //    // <div className="grid grid-cols-2 gap-6">
    //    //</div>   {menus.map(menu => (
    //         // <div key={menu.id} className="rounded-lg border p-4">
    //         //   <div className="flex items-center justify-between mb-2">
    //         //     <Label className="font-medium">{menu.MenuName}</Label>
    //         //     <Switch checked={menuAccess[menu.id]} onCheckedChange={() => toggleMenu(menu.id)} />
    //         //   </div>
    //         //   {/* Submenus */}
    //         //   <div className="ml-2 space-y-2">
    //         //     {menu.SubMenus.map(sub => (
    //         //       <div key={sub.id} className="flex items-center justify-between">
    //         //         <Label>{sub.SubMenuName}</Label>
    //         //         <Switch checked={submenuAccess[sub.id]} onCheckedChange={() => toggleSubMenu(sub.id)} />
    //         //       </div>
    //         //     ))}
    //         //   </div>
    //         // </div>
    //     //   ))}
    //     // </div>
    //     <Button className="mt-8 float-right" onClick={handleSave} variant="default">
    //       Save
    //     </Button>
    //   </CardContent>
    // </Card>
   <RemoveAccess id={idDecoded}  />
  );
}

export default page