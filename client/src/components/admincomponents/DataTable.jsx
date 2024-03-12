import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { CircularProgress } from "@mui/material";

const DataTable = ({ columns, slugs, slug }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${slugs}`],
    queryFn: () =>
      newRequest.get(`/${slugs}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/${slugs}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${slugs}`]);
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await mutation.mutateAsync(id);
      toast(res.data, toastOptions);
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/${slug}/${params.row._id}`}
            state={{ data: params.row }}
          >
            <EditIcon className="text-green-600" />
          </Link>
          <DeleteOutlineIcon
            className="text-red-500 cursor-pointer active:scale-90 duration-100 transition-all"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      );
    },
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress color="inherit" size="28px" />
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-full">
          <DataGrid
            className="p-5 bg-slate-100 dark:bg-white"
            rows={data}
            getRowId={(row) => row._id}
            columns={[...columns, actionColumn]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        </div>
      )}
    </>
  );
};

export default DataTable;
