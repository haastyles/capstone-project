import '../../styles/Forms.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function OrderOnline({individualCount}) {
    
    const individualCountArr = Object.values(individualCount);
    const items = individualCountArr.filter((item) => item.count > 0);

    const rows = items.map((item) =>
        [
            {
                title: item.item.title,
                quantity: item.count,
                priceNum: item.item.price * item.count,
                price: "$" + item.item.price * item.count
            }
        ]
    );

    let sum = 0;
    rows.forEach(r => {
        sum += r[0].priceNum;
    });

    const cols = [
        { field: 'title', headerName: 'Menu Item'},
        { field: 'quantity', headerName: 'Quantity'},
        { field: 'price', headerName: 'Price'},
    ];

    return (
        <>
            <div className="form-container">
                <div className="order-online">
                    <h2>Review your order</h2>
                    <h3>Order Total (pre tax): {"$" + sum}</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300, maxWidth: '95%' }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {cols.map((c) => 
                                        <TableCell sx={{ fontWeight: 1000 }}>{c.headerName}</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((r) => (
                                <TableRow key={r[0].title}>
                                <TableCell component="th" scope="row">{r[0].title}</TableCell>
                                <TableCell align="right">{r[0].quantity}</TableCell>
                                <TableCell align="right">{r[0].price}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
}

export default OrderOnline;