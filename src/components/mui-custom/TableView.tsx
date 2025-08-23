"use client"

import React , {useEffect,useState,useCallback} from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { getBillSummary } from '@/api/Bill';
import { Expand,RefreshCw  } from 'lucide-react';
import { Pagination } from '@mui/material';
import { columns } from './SetGridCol';
import { Switch } from "@/components/ui/switch";
import { PaginationTypes } from '@/api/Bill';
// import { useRouter } from 'next/navigation';
interface Bill {
  id: string;
  billNo: string;
  vendorName: string;
  billDate: string;
  poNo?: string;
  netAmount: number;
  grandTotal: number;
}

const customLocaleText = {
  // Override only what you need
  columnMenuSortAsc: 'Sort by Ascending',
  columnMenuSortDesc: 'Sort by Descending',
};
const TableView = () => {
  const [rows, setRows] = useState<Bill[]>([]);
  const [checked, setChecked] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<PaginationTypes>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  });
  

  // console.log("after click",loading)
  const handleChange =useCallback( async (value: boolean) => {
    setChecked(value);
  
    try {
      if (value) {
        // If the toggle is ON, call the API to get data for 'Open' status
        const { data, pagination } = await getBillSummary(1, 10, value);
        setPage(pagination);
        setRows(data);
        console.log("Switched to Open!",data,pagination);
      } else {
        // If the toggle is OFF, call the API to get data for 'Closed' status
        const { data, pagination } = await getBillSummary(1, 10, value);
        setPage(pagination);
        setRows(data);
        console.log("Switched to Closed!");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },[checked,page?.currentPage]);

  
  const handlePageChange = async (_: React.ChangeEvent<unknown>, newPage: number) => {
    const { data, pagination } = await getBillSummary(newPage, 10, checked);
        setPage(pagination);
        setRows(data);
  };


  const FetchedData = useCallback(async() => {
      try {
        setLoading(true);
        const { data, pagination } = await getBillSummary(Number(page?.currentPage), 10, checked);
        setRows(data);
        setPage(pagination);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }, [page?.currentPage, checked]); // Make sure to add dependencies if needed
  
  useEffect(() => {
    FetchedData();
  }, [FetchedData]);
  
  return (
    <div key={isFullscreen ? 'fullscreen' : 'normal'}
    className={`p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-300 ${
      isFullscreen
        ? "fixed top-0 left-0 w-full h-full z-50 bg-white p-6 overflow-auto"
        : "relative w-full max-w-[100%]"
    }`}>
    <div className="flex justify-between items-center mb-4">
      <span className="text-xl font-semibold">Bills</span>
      <div className="flex items-center gap-3">
      <button onClick={ FetchedData} className=" cursor-pointer">
          {
            loading ? (<RefreshCw className="h-5 w-5 text-gray-700 animate-spin" />):
           ( <RefreshCw className="h-5 w-5 text-gray-700" />)
          } 
        </button>
        <div className="flex items-center gap-3">
            <Switch checked={checked} onCheckedChange={handleChange} />
            <span className="w-[60px] text-sm text-gray-700">
              {checked ? "Closed" : "Open"}
            </span>
          </div>
          <div className='w-42'>
            <Pagination
                suppressHydrationWarning={true}
                count={page?.totalPages}
                page={page?.currentPage}
                onChange={handlePageChange}
                color="primary"
                siblingCount={0}
                boundaryCount={1}
              />
          </div>
          <Button variant="ghost" onClick={() => setIsFullscreen(!isFullscreen)}><Expand /></Button>
        </div>
    </div>
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={customLocaleText}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 20]}
        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
        checkboxSelection
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        getRowClassName={(params) =>
          params.row.status === 'PAID' ? 'bg-green-100 text-black hover:bg-green-100' : 'bg-white'
        }
      />
    </div>
  </div>
  )
}

export default TableView
