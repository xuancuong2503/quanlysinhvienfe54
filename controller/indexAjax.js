// console.log(axios);
// kết nối backend dựa vạo thư viện axios
var svService = new sinhVienService();
var layDanhSachSinhVienApi=function(){
   
    
    var promise = svService.layThongTinSinhVien(); // gọi đến BE lấy data
    //xử lý cho trường hợp gọi thành công
    promise.then(function(result) {
      //  console.log('Kết quả',result.data);
        //lấy dữ liệu khi server trả về 
        renderTable(result.data)
    });


    // xử lý cho trường hợp thất bại
    promise.then(function(error) {
      //  console.log(error);
    });
}

var renderTable = function(mangSinhVien){

    var noiDungTable = '';
    for(var i=0; i<mangSinhVien.length ; i++){
        var sv = new SinhVien();
        sv.maSinhVien=mangSinhVien[i].maSinhVien;
        sv.tenSinhVien=mangSinhVien[i].tenSinhVien;
        sv.diemToan=mangSinhVien[i].diemToan;
        sv.diemLy=mangSinhVien[i].diemLy;
        sv.diemHoa=mangSinhVien[i].diemHoa;
        sv.diemRenLuyen=mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien=mangSinhVien[i].loaiSinhVien;
        sv.email=mangSinhVien[i].email;

        //tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable +=`
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.email}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                    <button class="btn btn-primary" onclick="suaSinhVien('${sv.maSinhVien}')">Chỉnh Sửa</button>
                </td>
            </tr>
            `
        ;
    }
    document.querySelector('#tableSinhVien').innerHTML= noiDungTable;
    
}

layDanhSachSinhVienApi();


//Chức năng thêm sinh viên lưu trữ vào server thông qua  api backend...
document.querySelector('#btnXacNhan').onclick = function(){
    //lấy dữ liệu người dùng nhập vào
    var sv = new SinhVien();
    sv.maSinhVien=document.querySelector('#maSinhVien').value;
    sv.tenSinhVien=document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien=document.querySelector('#loaiSinhVien').value;
    sv.diemToan=document.querySelector('#diemToan').value;
    sv.diemLy=document.querySelector('#diemLy').value;
    sv.diemHoa=document.querySelector('#diemHoa').value;
    sv.diemRenLuyen=document.querySelector('#diemRenLuyen').value;
    sv.email=document.querySelector('#email').value;
    console.log('sinh viên',sv);

    //dùng axios đưa dữ liệu về server thông qua api BE cung cấp

    var promise=axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',// API BE cung cấp
        method:'POST',// giao thức BE cung cấp
        data: sv//dữ liệu gởi đi (lưu ý: dữ liệu gửi đi phải đúng forrmat dữ liệu của BE yêu cầu)
    });


    promise.then(function(result){
        console.log(result.data);

        //gọi phương thức lấy thông tin sinh viên tạo lại tbale mới
        layDanhSachSinhVienApi();
    });
    promise.then(function(error){
        console.log(error.data);
    })
} 

//chức năng xóa sinh viên server dựa vào api be...

var xoaSinhVien =function(maSinhVien){

    var promise=axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
        method:'DELETE',
    })

    promise.then(function(result){
        console.log(result.data);
        layDanhSachSinhVienApi();
    });

    promise.then(function(error){
        console.log(error.data);
    })
}

///chức nawgs xóa sinh viên
var suaSinhVien = function(maSinhVien){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVien,
        method:'GET'
    })


    promise.then(function(result){
        console.log(result.data);
        // gán dữ liệu server lên giao diện
        document.querySelector('#maSinhVien').value= result.data.maSinhVien;
        document.querySelector('#tenSinhVien').value= result.data.tenSinhVien;
        document.querySelector('#email').value= result.data.email;
        document.querySelector('#loaiSinhVien').value= result.data.loaiSinhVien;
        document.querySelector('#diemToan').value= result.data.diemToan;
        document.querySelector('#diemLy').value= result.data.diemLy;
        document.querySelector('#diemHoa').value= result.data.diemHoa;
        document.querySelector('#diemRenLuyen').value= result.data.diemRenLuyen;
    });
    promise.catch(function(error){
        console.log(error.data);
    })

}


// chức năng lưu thông tin sinh viên server dựa vào api cung cấp
document.querySelector('#btnLuuThongTin').onclick=function(){
    //lấy dữ liệu từ người dùng nhập vào đưua vào đối tượng theo format dữ liệu của BE yêu cầu
    var sv = new SinhVien();
    sv.maSinhVien=document.querySelector('#maSinhVien').value;
    sv.tenSinhVien=document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien=document.querySelector('#loaiSinhVien').value;
    sv.diemToan=document.querySelector('#diemToan').value;
    sv.diemLy=document.querySelector('#diemLy').value;
    sv.diemHoa=document.querySelector('#diemHoa').value;
    sv.diemRenLuyen=document.querySelector('#diemRenLuyen').value;
    sv.email=document.querySelector('#email').value;
    
    //gọi ajax đưa dữ liệu vào server cập nhật
    var promise=axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sv.maSinhVien,
        method:'PUT',
        data:sv
    })
    promise.then(function(result){
        console.log(result.data);
    });
    
    promise.catch(function(error){
        console.log(error.data);
    })
}