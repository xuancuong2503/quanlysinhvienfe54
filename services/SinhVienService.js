//lớp đối tượng chứa các phườn thức giao tiếp vs BE(API)

var sinhVienService = function () {
    this.layThongTinSinhVien = function () {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',//BE cung cấp
            method:'GET'
        })
        return promise;
    }
    
}